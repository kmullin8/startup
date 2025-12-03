import React from 'react';
import { GameEvent, GameNotifier } from './gameNotifier';
import './play.css';

export function ActivityFeed({ user }) {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    // Every incoming WebSocket event
    const handler = (event) => {
      const id = crypto.randomUUID();

      // Add the new event (with ID + timestamp)
      setEvents((prev) => {
        const updated = [...prev, { ...event, id, timestamp: Date.now() }];

        // Limit to latest 5
        return updated.slice(-5);
      });

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }, 5000);
    };

    GameNotifier.addHandler(handler);

    return () => {
      GameNotifier.removeHandler(handler);
    };
  }, []);

  function renderMessages() {
    return events.map((event) => {
      let message = 'did something';

      if (event.type === GameEvent.Start) {
        message = 'started a new game';
      } else if (event.type === GameEvent.Correct) {
        message = `answered correctly (score ${event.value.score})`;
      } else if (event.type === GameEvent.Wrong) {
        message = 'answered incorrectly';
      } else if (event.type === GameEvent.End) {
        message = `finished a game with ${event.value.score} points`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      const fromName = event.from.includes('@')
        ? event.from.split('@')[0]
        : event.from;

      return (
        <div key={event.id} className="activity-event">
          <span className="activity-player">{fromName}</span> {message}
        </div>
      );
    });
  }

  return (
    <div className="activity-panel">
      <div className="activity-title">Player Activity</div>
      <div className="activity-body">
        {events.length === 0 ? (
          <div className="activity-empty">Waiting for other players...</div>
        ) : (
          renderMessages()
        )}
      </div>
    </div>
  );
}
