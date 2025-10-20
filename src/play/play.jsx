import React from 'react';
import './play.css';

export function Play({ user }) {
  const [score, setScore] = React.useState(0);
  const [buttonColors, setButtonColors] = React.useState([null, null, null, null]);
  const [disabledButtons, setDisabledButtons] = React.useState([false, false, false, false]);
  const [timeRemaining, setTimeRemaining] = React.useState(30); // start at 30 seconds

  // Countdown timer
  React.useEffect(() => {
    if (timeRemaining <= 0) return; // stop at 0

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  function handleAnswerClick(index) {
    const isCorrect = Math.random() < 0.25;

    if (isCorrect) {
      const newScore = score + 25;
      setScore(newScore);
      localStorage.setItem('score', newScore);
    }

    const newColors = [...buttonColors];
    const newDisabled = [...disabledButtons];
    newColors[index] = isCorrect ? 'green' : 'red';
    newDisabled[index] = true;
    setButtonColors(newColors);
    setDisabledButtons(newDisabled);

    setTimeout(() => {
      const resetColors = [null, null, null, null];
      const resetDisabled = [false, false, false, false];
      setButtonColors(resetColors);
      setDisabledButtons(resetDisabled);
    }, 900);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function resetGame() {
    setScore(0);
    setTimeRemaining(30);
    setButtonColors([null, null, null, null]);
    setDisabledButtons([false, false, false, false]);
    localStorage.removeItem('score');
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

        <div className="timer" style={{ color: timeRemaining === 0 ? 'red' : 'black' }}>
          <span>Time Remaining: {formatTime(timeRemaining)}</span>
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
            disabled={disabledButtons[index] || timeRemaining <= 0}
            style={{
              backgroundColor: buttonColors[index] || '',
              color: buttonColors[index] ? 'white' : '',
              transition: 'background-color 0.3s ease',
              opacity: disabledButtons[index] || timeRemaining <= 0 ? 0.7 : 1,
              cursor:
                disabledButtons[index] || timeRemaining <= 0
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Answer {letter}
          </button>
        ))}
      </div>

      {/* Only show Play Again button when time runs out */}
      {timeRemaining === 0 && (
        <div className="play-again-container">
          <button type="button" className="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}
