import React from "react";

/**
 * StartScreen displays the initial welcome message and a button to start the game.
 *
 * @param {object} props - The props object.
 * @param {function} props.onStartGame - The function to call when the start button is clicked.
 */
const StartScreen = ({ onStartGame }) => {
  return (
    <div className="start-screen">
      <div className="start-screen-content">
        <h2>Welcome to AI Charades!</h2>
        <p>
          Get ready to act out the word on the screen. The AI will try to guess
          what you're doing in real time.
        </p>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
