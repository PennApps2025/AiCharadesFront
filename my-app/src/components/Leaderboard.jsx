import React from "react";

/**
 * LeaderboardScreen displays the scores from the backend.
 *
 * @param {object} props
 * @param {Array} props.scores - Array of { name, score } objects.
 * @param {function} props.onBack - Function to go back to start screen.
 */
const LeaderboardScreen = ({ scores = [], onBack }) => {
  return (
    <div className="leaderboard-screen">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      <ul className="leaderboard-list">
        {scores.length > 0 ? (
          scores.map((player, index) => (
            <li key={index} className="leaderboard-item">
              <span className="rank">#{index + 1}</span>
              <span className="name">{player.name}</span>
              <span className="score">{player.score}</span>
            </li>
          ))
        ) : (
          <p className="no-scores">No scores yet...</p>
        )}
      </ul>
      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default LeaderboardScreen;
