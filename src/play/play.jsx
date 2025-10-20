import React from 'react';
import './play.css';

export function Play({ user }) {
  const [score, setScore] = React.useState(0);
  const [buttonColors, setButtonColors] = React.useState([null, null, null, null]);
  const [disabledButtons, setDisabledButtons] = React.useState([false, false, false, false]);

  function handleAnswerClick(index) {
    const isCorrect = Math.random() < 0.25;

    // Update score if correct
    if (isCorrect) {
      const newScore = score + 25;
      setScore(newScore);
      localStorage.setItem('score', newScore);
    }

    // Update color and disable clicked button
    const newColors = [...buttonColors];
    const newDisabled = [...disabledButtons];
    newColors[index] = isCorrect ? 'green' : 'red';
    newDisabled[index] = true;
    setButtonColors(newColors);
    setDisabledButtons(newDisabled);

    // Reset after .9 second
    setTimeout(() => {
      const resetColors = [null, null, null, null];
      const resetDisabled = [false, false, false, false];
      setButtonColors(resetColors);
      setDisabledButtons(resetDisabled);
    }, 900);
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
          <input
            type="text"
            id="count"
            value={score === 0 ? '--' : score}
            readOnly
          />
        </div>

        <div className="timer">
          <span>Time Remaining: 0:00</span>
        </div>
      </div>

      <p className="question-text" style={{ textAlign: 'center', maxWidth: '900px' }}>
        txt for the question txt for the question txt for the question txt for the question txt
        for the question txt for the question txt for the question txt for the question
      </p>

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
        {['A', 'B', 'C', 'D'].map((letter, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleAnswerClick(index)}
            disabled={disabledButtons[index]}
            style={{
              backgroundColor: buttonColors[index] || '',
              color: buttonColors[index] ? 'white' : '',
              transition: 'background-color 0.3s ease',
              opacity: disabledButtons[index] ? 0.7 : 1,
              cursor: disabledButtons[index] ? 'not-allowed' : 'pointer',
            }}
          >
            Answer {letter}
          </button>
        ))}
      </div>
    </main>
  );
}