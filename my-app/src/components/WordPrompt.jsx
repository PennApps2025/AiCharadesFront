import React from "react";

const WordPrompt = ({ word }) => {
  return (
    <div className="word-prompt">
      <h1>
        Your word is: <span className="word">{word}</span>
      </h1>
    </div>
  );
};

export default WordPrompt;
