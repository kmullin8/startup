import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const [user, setuser] = React.useState(localStorage.getItem('user') || '');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [tip, setTip] = React.useState(''); // 🟡 random tip
  const navigate = useNavigate();

  // 🟡 Fetch random tip from third-party API
  async function fetchTip() {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setTip(data.slip.advice);
    } catch (err) {
      console.error('Failed to fetch tip:', err);
      setTip('Failed to load tip. Try refreshing!');
    }
  }

  React.useEffect(() => {
    fetchTip();
  }, []);

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user, password }),
      });

      if (response.ok) {
        localStorage.setItem('user', user);
        setUser(user);
        navigate('/play');
      } else {
        const body = await response.json();
        setError(`⚠ ${body.msg}`);
      }
    } catch (err) {
      console.error(err);
      setError('⚠ Unable to connect to server');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    loginOrCreate('/api/auth/login');
  }

  function handleCreate(e) {
    e.preventDefault();
    loginOrCreate('/api/auth/create');
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'DELETE' });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('user');
    setUser(null);
    setuser('');
    setPassword('');
    navigate('/');
  }

  const loggedIn = !!localStorage.getItem('user');

  return (
    <main>
      <h1>Welcome to Trivia Challenge 3000</h1>

      <form>
        {!loggedIn && (
          <>
            <div>
              <span>
                <img
                  src="envelope.svg"
                  alt="email logo"
                  style={{
                    height: '1.5em',
                    verticalAlign: 'middle',
                    marginRight: '0.3em',
                  }}
                />
              </span>
              <input
                type="text"
                placeholder="your@email.com"
                onChange={(e) => setuser(e.target.value)}
              />
            </div>

            <div>
              <span>
                <img
                  src="lock.svg"
                  alt="password logo"
                  style={{
                    height: '1.5em',
                    verticalAlign: 'middle',
                    marginRight: '0.3em',
                  }}
                />
              </span>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-row">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleCreate}>Create</button>
            </div>
          </>
        )}

        {loggedIn && (
          <div className="logged-in">
            <div className="user-box">
              <span className="user-label">Logged in as:</span>
              <span className="user-name">{localStorage.getItem('user')}</span>
            </div>

            <div className="button-row logout-row">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {tip && <p className="login-tip">“{tip}”</p>}
    </main>
  );
}
