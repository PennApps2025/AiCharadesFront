import React from "react";

const WinCondition = ({ word, onPlayAgain }) => {
  return (
    <div className="win-screen">
      <h2>Success! The AI guessed it!</h2>
      <p>
        The word was: <strong>{word}</strong>
      </p>
      <button className="start-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default WinCondition;
