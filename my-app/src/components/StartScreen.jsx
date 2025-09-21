import React from "react";
import titleImg from "../../resources/title.png";
import curiousRobot from "../../resources/curious_robot.gif";
import jumpRobot from "../../resources/jump_robot.gif";
import startImg from "../../resources/start.png";
import leaderboard from "../../resources/leaderboard.png";

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

      {/* Container for the buttons */}
      <div className="button-container">
        <img
          src={startImg}
          alt="Start Game button"
          className="start-button" // You can keep this class for styling
          onClick={onStartGame}
          style={{ cursor: "pointer" }}
        />
        <img
          src={leaderboard}
          alt="leaderboard"
          className="leader-button" // Use a different class or the same if styles are identical
          // onClick={onShowLeaderboard} // leaderboard function here @@@@@@@@@
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default StartScreen;
