import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]); // leaderboard entries
  const [loading, setLoading] = React.useState(true);

  // Mock database data
  const mockScores = [
    { id: 1, name: '도윤 이', score: 34, date: 'May 20, 2021' },
    { id: 2, name: 'Annie James', score: 29, date: 'June 2, 2021' },
    { id: 3, name: 'Gunter Spears', score: 7, date: 'July 3, 2020' },
    { id: 4, name: 'Kaden Mullin', score: 56, date: 'Oct 20, 2025' },
  ];

  // Simulate fetching scores from a database
  async function fetchScores() {
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // in a real app, you’d do: const res = await fetch('/api/scores');
    // const data = await res.json();
    return mockScores;
  }

  // Fetch once when component mounts
  React.useEffect(() => {
    fetchScores().then((data) => {
      setScores(data);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading leaderboard...</p>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
