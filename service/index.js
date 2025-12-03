const db = require('./database');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const { peerProxy } = require('./peerProxy');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for service endpoints
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// ---------- Authentication Endpoints ----------

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const existing = await db.getUser(req.body.email);
  if (existing) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await db.addUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await db.getUser(req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuid.v4();
    await db.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await db.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// ---------- Auth Middleware ----------

const verifyAuth = async (req, res, next) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ---------- Score Endpoints ----------

// GetScores
apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  const scores = await db.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  await db.addScore(req.body);
  const scores = await db.getHighScores();
  res.send(scores);
});

// ---------- Error + Default Handlers ----------

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ---------- Start HTTP + Attach WebSocket ----------

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Attach WebSocket server using the existing HTTP server
peerProxy(httpService);
