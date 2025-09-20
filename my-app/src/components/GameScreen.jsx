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
  paused = false,
  isTransitioning = false,
  currentRound = 0,
}) => {
  const CAPTURE_INTERVAL = 4; // seconds

  return (
    <div className={"game-screen" + (isTransitioning ? " transitioning" : "")}>
      <div className="game-header">
        <WordPrompt word={currentWord} />
        {/* Render Timer always (so it can listen to round changes) but hide when paused */}
        <div style={{ visibility: paused ? 'hidden' : 'visible', width: 300 }}>
          <Timer duration={duration} onTimeUp={onTimeUp} paused={paused} round={currentRound} />
        </div>
      </div>

      {/* Webcam + Countdown side by side */}
      <div className="webcam-countdown-container">
        <div className="webcam-container">
          <WebcamFeed onCapture={onCapture} paused={paused} />
        </div>
        <CountdownTimer interval={CAPTURE_INTERVAL} onCapture={onCapture} paused={paused} />
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
