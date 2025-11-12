const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

// Build connection string
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('startup');

// Collections
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// Test connection once on startup
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB Atlas');
  } catch (ex) {
    console.error(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

/* ========== USER FUNCTIONS ========== */

// Find a user by email
async function getUser(email) {
  return userCollection.findOne({ email });
}

// Find a user by session token
async function getUserByToken(token) {
  return userCollection.findOne({ token });
}

// Add a new user
async function addUser(user) {
  await userCollection.insertOne(user);
}

// Update an existing user (e.g., new token)
async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

/* ========== SCORE FUNCTIONS ========== */

// Add a new score record
async function addScore(score) {
  return scoreCollection.insertOne(score);
}

// Get top 10 scores
async function getHighScores() {
  const query = { score: { $gt: 0 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  return scoreCollection.find(query, options).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addScore,
  getHighScores,
};
