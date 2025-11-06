import React from 'react';
import './play.css';
import { questionsDB } from '../data/questions.js';

export function Play({ user }) {
  const [score, setScore] = React.useState(0);
  const [buttonColors, setButtonColors] = React.useState([null, null, null, null]);
  const [disabledButtons, setDisabledButtons] = React.useState([false, false, false, false]);
  const [timeRemaining, setTimeRemaining] = React.useState(30);
  const [question, setQuestion] = React.useState(null);
  const [gameOver, setGameOver] = React.useState(false);

  // Simulate fetching from a database
  async function fetchQuestion() {
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay
    const randomIndex = Math.floor(Math.random() * questionsDB.length);
    return questionsDB[randomIndex];
  }

  // Fetch the first question on mount
  React.useEffect(() => {
    fetchQuestion().then(setQuestion);
  }, []);

  // Countdown timer
  React.useEffect(() => {
    if (timeRemaining === 0) {
      if (score > 0) {
        submitScore().then(() => console.log('Score saved automatically.'));
      }
      setGameOver(true);
      setDisabledButtons([true, true, true, true]); // lock buttons when game ends
      return;
    }

    const timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // --- FIXED handleAnswerClick ---
  async function handleAnswerClick(index) {
    // Prevent spam clicking or answering twice
    if (disabledButtons.some((d) => d)) return;
    if (!question) return;

    const isCorrect = index === question.correctIndex;

    // Immediately disable buttons
    setDisabledButtons([true, true, true, true]);

    const newColors = [...buttonColors];

    if (isCorrect) {
      const newScore = score + 25;
      setScore(newScore);
      localStorage.setItem('score', newScore);
      newColors[index] = 'green';
    } else {
      newColors[index] = 'red';
      newColors[question.correctIndex] = 'green';
    }

    setButtonColors(newColors);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fetch next question safely
    const nextQuestion = await fetchQuestion();
    setQuestion(nextQuestion);

    // Reset for new question
    setButtonColors([null, null, null, null]);
    setDisabledButtons([false, false, false, false]);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  async function submitScore() {
    try {
      await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important so cookies (auth) are sent
        body: JSON.stringify({
          name: user,
          score: score,
          date: new Date().toLocaleDateString(),
        }),
      });
    } catch (err) {
      console.error('Failed to submit score:', err);
    }
  }

  async function resetGame() {
    setScore(0);
    setTimeRemaining(30);
    setButtonColors([null, null, null, null]);
    setDisabledButtons([false, false, false, false]);
    setGameOver(false);
    localStorage.removeItem('score');

    const nextQuestion = await fetchQuestion();
    setQuestion(nextQuestion);
  }

  return (
    <main>
      <div className="status-bar">
        <div className="players">
          Player: <span className="player-name">{user}</span>
        </div>

        <div className="score">
          <label htmlFor="count">Score</label>
          <input type="text" id="count" value={score === 0 ? '--' : score} readOnly />
        </div>

        <div className="timer" style={{ color: timeRemaining === 0 ? 'red' : 'black' }}>
          <span>Time Remaining: {formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Display question only when loaded */}
      {question ? (
        <>
          <p
            className="question-text"
            style={{ textAlign: 'center', maxWidth: '900px', whiteSpace: 'pre-line' }}
          >
            {question.text}
            {'\n'}
            {question.answers.map((ans) => `\n${ans}`).join('')}
          </p>

          <div className="answers">
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
        </>
      ) : (
        <p className="question-text" style={{ textAlign: 'center' }}>
          Loading question...
        </p>
      )}

      {/* Game Over Message + Play Again */}
      {gameOver && (
        <div className="play-again-container">
          <p style={{ textAlign: 'center', marginBottom: '1em', fontWeight: 'bold' }}>
            ⏰ Game Over! Your score has been saved.
          </p>
          <button type="button" className="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}
