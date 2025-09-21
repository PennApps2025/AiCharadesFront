import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { getLeaderboard } from "../api/gameApi";

const LeaderboardScreen = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setScores(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard");
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-screen">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      
      {isLoading ? (
        <div className="loading-message">Loading scores...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <ul className="leaderboard-list">
          {scores.length > 0 ? (
            scores.map((player, index) => (
              <li key={index} className="leaderboard-item">
                <span className="rank">#{index + 1}</span>
                <span className="name">{player.username}</span>
                <span className="score">{player.score}</span>
              </li>
            ))
          ) : (
            <p className="no-scores">No scores yet...</p>
          )}
        </ul>
      )}
      
      <button className="back-button" onClick={onBack}>
        Back to Start
      </button>
    </div>
  );
};

export default LeaderboardScreen;
