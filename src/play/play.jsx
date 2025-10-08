import React from 'react';
import './play.css';

export function Play() {
  return (
    <main>
      <div
        className="status-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1em',
          maxWidth: '700px',
          margin: 'auto',
        }}
      >
        <div className="players">
          Player: <span className="player-name">player username</span>
        </div>

        <div className="score">
          <label htmlFor="count">Score</label>
          <input type="text" id="count" defaultValue="--" readOnly />
        </div>

        <div className="timer">
          <span>Time Remaining: 0:00</span>
        </div>
      </div>

      {/* Question text */}
      <p
        className="question-text"
        style={{ textAlign: 'center', maxWidth: '900px'}}
      >
        txt for the question txt for the question txt for the question txt for the question txt
        for the question txt for the question txt for the question txt for the question
      </p>

      {/* Answer choices */}
      <div
        className="answers"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1em',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '2em auto',
        }}
      >
        <button type="submit">Answer A</button>
        <button type="submit">Answer B</button>
        <button type="submit">Answer C</button>
        <button type="submit">Answer D</button>
      </div>
    </main>
  );
}