import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>
            <img
              src="favicon.svg"
              alt="Trivia logo"
              style={{ height: '1em', verticalAlign: 'middle', marginRight: '0.3em' }}
            />
            Trivia Challenge 3000<sup>&reg;</sup>
          </h1>

          <nav>
            <menu>
              <li><a href="index.html">Login</a></li>
              <li><a href="play.html">Play</a></li>
              <li><a href="scores.html">Scores</a></li>
            </menu>
          </nav>

          <hr />
        </header>

        <main>App components go here</main>

        <footer>
          <div className="name-github">
            <span className="text-reset">Kaden Mullin-</span>
            <a href="https://github.com/kmullin8/startup.git">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
