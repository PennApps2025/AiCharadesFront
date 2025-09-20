import React from "react";

const AIGuessDisplay = ({ guess }) => {
  return (
    <div className="ai-guess">
      <h2>AI Guess: {guess || "..."}</h2>
    </div>
  );
};

export default AIGuessDisplay;
