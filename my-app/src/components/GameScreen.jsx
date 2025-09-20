import React from "react";

import WordPrompt from "./WordPrompt";
import WebcamFeed from "./WebcamFeed";
import AIGessDisplay from "./AIGuessDisplay";
import Timer from "./Timer";

// --- UPDATED to accept 'duration' and 'onTimeUp' ---
const GameScreen = ({ word, aiGuess, onCapture, duration, onTimeUp, onSkipWord, onQuit }) => {
  return (
    <div className="game-screen">
      <div className="game-header">
        <WordPrompt word={word} />
        {/* --- UPDATED to pass the new props to the Timer --- */}
        <Timer duration={duration} onTimeUp={onTimeUp} />
      </div>

      <div className="webcam-container">
        <WebcamFeed onCapture={onCapture} />
      </div>

      {/* Component to display what the AI is guessing */}
      <AIGuessDisplay guess={aiGuess} />

      <div className="game-controls">
        <button onClick={onSkipWord}>Skip Word</button>
        <button onClick={onQuit}>Quit</button>
      </div>
    </div>
  );
};

export default GameScreen;
