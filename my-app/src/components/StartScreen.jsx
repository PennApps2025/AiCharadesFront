import React from "react";
import titleImg from "../../resources/title.png";
import curiousRobot from "../../resources/curious_robot.gif";
import jumpRobot from "../../resources/jump_robot.gif";
import startImg from "../../resources/start.png";

/**
 * StartScreen displays the initial welcome message and a button to start the game.
 *
 * @param {object} props - The props object.
 * @param {function} props.onStartGame - The function to call when the start button is clicked.
 */
const StartScreen = ({ onStartGame }) => {
  return (
    <div className="start-screen">
      <img
        src={curiousRobot}
        alt="curious robot"
        className="start-robot-left"
      />
      <img src={titleImg} alt="AI Charades" className="start-title" />
      <img src={jumpRobot} alt="jump robot" className="start-robot-right" />
      {/* <div className="start-screen-content">
        <h2>Welcome to AI Charades!</h2>
        <p>
          Get ready to act out the word on the screen. The AI will try to guess
          what you're doing in real time.
        </p> */}
      <img
        src={startImg}
        alt="Start Game button"
        className="start-button"
        onClick={onStartGame}
        style={{ cursor: "pointer" }} // Optional: adds a pointer cursor on hover
      />
      {/* </div> */}
    </div>
  );
};

export default StartScreen;
