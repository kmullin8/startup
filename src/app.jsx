import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') || null);

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
              <li className="nav-item">
                <NavLink className="nav-link" to="">Login</NavLink>
              </li>
              {user && <li className="nav-item">
                <NavLink className="nav-link" to="play">Play</NavLink>
              </li>}
              <li className="nav-item">
                <NavLink className="nav-link" to="scores">Scores</NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/play' element={<Play />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

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

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}