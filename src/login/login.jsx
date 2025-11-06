import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const [user, setuser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

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

  return (
    <main>
      <h1>Welcome to Trivia Challenge 3000</h1>
      <form>
        <div>
          <span>
            <img src="envelope.svg" alt="email logo" style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }} />
          </span>
          <input type="text" placeholder="your@email.com" onChange={(e) => setuser(e.target.value)} />
        </div>
        <div>
          <span>
            <img src="lock.svg" alt="password logo" style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }} />
          </span>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-row">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleCreate}>Create</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}
