import React from 'react';
import './play.css';

export function Play({ user }) {
  const [score, setScore] = React.useState(0);

  function handleAnswerClick() {
    const isCorrect = Math.random() < 0.25;

    if (isCorrect) {
      setScore(score + 25);
      localStorage.setItem('score', score + 25);
    }
  }

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
          Player: <span className="player-name">{user}</span>
        </div>

        <div className="score">
          <label htmlFor="count">Score</label>
          <input type="text" id="count" value={score === 0 ? '--' : score} readOnly />
        </div>

        <div className="timer">
          <span>Time Remaining: 0:00</span>
        </div>
      </div>

      {/* Question text */}
      <p
        className="question-text"
        style={{ textAlign: 'center', maxWidth: '900px' }}
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
        <button type="button" onClick={handleAnswerClick}>Answer A</button>
        <button type="button" onClick={handleAnswerClick}>Answer B</button>
        <button type="button" onClick={handleAnswerClick}>Answer C</button>
        <button type="button" onClick={handleAnswerClick}>Answer D</button>
      </div>
    </main>
  );
}