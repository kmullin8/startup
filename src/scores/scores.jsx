import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchScores() {
    try {
      const res = await fetch('/api/scores', { credentials: 'include' }); // ✅ include cookie
      if (!res.ok) throw new Error('Failed to fetch scores');
      const data = await res.json();
      return data.sort((a, b) => b.score - a.score).slice(0, 5); // ✅ only top 5
    } catch (err) {
      console.error(err);
      return [];
    }
  }

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
              <tr key={`${entry.name}-${index}`}>
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
