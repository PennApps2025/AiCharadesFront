import React, { memo } from "react";

const WordPrompt = memo(({ word }) => {
  return (
    <div className="word-prompt">
      <h1>
        PROMPT: <span className="word">{word}</span>
      </h1>
    </div>
  );
});

export default WordPrompt;
