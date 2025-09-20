import React from "react";

import WordPrompt from "./WordPrompt";
import WebcamFeed from "./WebcamFeed";
import AIGuessDisplay from "./AIGuessDisplay";

/**
 * GameScreen is the main view when the game is actively being played.
 * It composes the other key components for the game loop.
 *
 * @param {object} props - The props object.
 * @param {string} props.word - The word the user needs to act out.
 * @param {string} props.aiGuess - The AI's current guess.
 * @param {function} props.onCapture - The function to call when a frame is captured.
 */
const GameScreen = ({ word, aiGuess, onCapture }) => {
  return (
    <div className="game-screen">
      {/* Component to display the word to the user */}
      <WordPrompt word={word} />

      <div className="webcam-container">
        {/* Component that handles the camera feed and captures frames */}
        <WebcamFeed onCapture={onCapture} />
      </div>

      {/* Component to display what the AI is guessing */}
      <AIGuessDisplay guess={aiGuess} />
    </div>
  );
};

export default GameScreen;
