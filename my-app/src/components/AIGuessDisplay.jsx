import React from "react";

const AIGuessDisplay = ({ guess }) => {
  return (
    <div className="ai-guess">
      <h2> {guess || "..."}</h2>
    </div>
  );
};

export default AIGuessDisplay;
