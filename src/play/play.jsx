import React from 'react';
import './play.css';

export function Play({ user }) {
  const [score, setScore] = React.useState(0);
  const [buttonColors, setButtonColors] = React.useState([null, null, null, null]);
  const [disabledButtons, setDisabledButtons] = React.useState([false, false, false, false]);
  const [timeRemaining, setTimeRemaining] = React.useState(30);
  const [question, setQuestion] = React.useState(null); // store actual question object

  // Mock "database" questions
  const mockQuestions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      answers: ['A) Paris', 'B) Rome', 'C) Madrid', 'D) Berlin'],
      correctIndex: 0,
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      answers: ['A) Earth', 'B) Mars', 'C) Jupiter', 'D) Venus'],
      correctIndex: 1,
    },
    {
      id: 3,
      text: 'Who wrote "Romeo and Juliet"?',
      answers: ['A) Mark Twain', 'B) Charles Dickens', 'C) William Shakespeare', 'D) Jane Austen'],
      correctIndex: 2,
    },
  ];

  // Simulate fetching from a database
  async function fetchQuestion() {
    // simulate network delay (later, replace with fetch('/api/question'))
    await new Promise((resolve) => setTimeout(resolve, 300));

    // pick a random question for now
    const randomIndex = Math.floor(Math.random() * mockQuestions.length);
    return mockQuestions[randomIndex];
  }

  // On mount, fetch the first question
  React.useEffect(() => {
    fetchQuestion().then(setQuestion);
  }, []);

  // Countdown timer
  React.useEffect(() => {
    if (timeRemaining <= 0) return;
    const timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  function handleAnswerClick(index) {
    if (!question) return;

    const isCorrect = index === question.correctIndex;
    const newColors = [...buttonColors];
    const newDisabled = [true, true, true, true];

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
    setDisabledButtons(newDisabled);

    setTimeout(async () => {
      setButtonColors([null, null, null, null]);
      setDisabledButtons([false, false, false, false]);

      // fetch next question from “database”
      const nextQuestion = await fetchQuestion();
      setQuestion(nextQuestion);
    }, 900);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  async function resetGame() {
    setScore(0);
    setTimeRemaining(30);
    setButtonColors([null, null, null, null]);
    setDisabledButtons([false, false, false, false]);
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
        </>
      ) : (
        <p className="question-text" style={{ textAlign: 'center' }}>
          Loading question...
        </p>
      )}

      {/* Play Again */}
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
