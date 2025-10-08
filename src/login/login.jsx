import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
      <h1>Welcome to Trivia Challenge 3000</h1>
      <form method="get" action="play.html">
        <div>
          <span>
            <img
              src="envelope.svg"
              alt="email logo"
              style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }}
            />
          </span>
          <input type="text" placeholder="your@email.com" />
        </div>
        <div>
          <span>
            <img
              src="lock.svg"
              alt="password logo"
              style={{ height: '1.5em', verticalAlign: 'middle', marginRight: '0.3em' }}
            />
          </span>
          <input type="password" placeholder="password" />
        </div>
        <div className="button-row">
          <button type="submit">Login</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </main>
  );
}
