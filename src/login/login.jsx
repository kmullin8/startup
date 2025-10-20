import React from 'react';
import './login.css';

export function Login({ setUser }) {
  const [user, setuser] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginUser() {
    event.preventDefault();
    localStorage.setItem('user', user);
    localStorage.setItem('password', password);
    setUser(user);
  }

  return (
    <main>
      <h1>Welcome to Trivia Challenge 3000</h1>
      <form>
        <div>
          <span>
            <img
              src="envelope.svg"
              alt="email logo"
              style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }}
            />
          </span>
          <input type="text" placeholder="your@email.com" onChange={(e) => setuser(e.target.value)} />
        </div>
        <div>
          <span>
            <img
              src="lock.svg"
              alt="password logo"
              style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }}
            />
          </span>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-row">
          <button onClick={loginUser}>Login</button>
        </div>
      </form>
    </main>
  );
}
