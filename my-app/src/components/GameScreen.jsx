import React from "react";

// Import your components
import WordPrompt from "./WordPrompt";
import WebcamFeed from "./WebcamFeed";
import AIGuessDisplay from "./AIGuessDisplay";
import Timer from "./Timer";
import CountdownTimer from "./CountdownTimer";

// Import the new CSS for layout and arcade theme
import "../gameScreenLayout.css";

const GameScreen = ({
  currentWord,
  aiGuess,
  onCapture,
  duration,
  onTimeUp,
  onSkipWord,
  onQuit,
}) => {
  const CAPTURE_INTERVAL = 4; // seconds

  return (
    <div className="game-screen">
      <div className="game-header">
        <WordPrompt word={currentWord} />
        {/* --- UPDATED to pass the new props to the Timer --- */}
        <Timer duration={duration} onTimeUp={onTimeUp} />
      </div>

      {/* Webcam + Countdown side by side */}
      <div className="webcam-countdown-container">
        <div className="webcam-container">
          <WebcamFeed onCapture={onCapture} />
        </div>
        <CountdownTimer interval={CAPTURE_INTERVAL} onCapture={onCapture} />
      </div>

      <AIGuessDisplay guess={aiGuess} />

      <div className="game-controls">
        <button className="control-button skip-button" onClick={onSkipWord}>
          Skip Word
        </button>
        <button className="control-button quit-button" onClick={onQuit}>
          Quit Game
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
