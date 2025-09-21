import React from "react";
import "../EndScreen.css";

const EndScreen = ({ score, totalRounds, onRestart }) => {
  return (
    <div className="end-screen">
      <h1 className="end-title">Game Over</h1>
      <p className="end-score">
        Your Score: {score} / {totalRounds}
      </p>
      <button className="end-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
