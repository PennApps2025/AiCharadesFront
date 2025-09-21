import React, { useEffect, useState } from "react";
import "./EndScreen.css";

const EndScreen = ({ score, totalRounds, onRestart, onBackToStart }) => {
  const [showContent, setShowContent] = useState(false);
  const accuracy = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  
  useEffect(() => {
    // 애니메이션을 위한 딜레이
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="end-screen-container">
      <div className={`end-screen-content ${showContent ? 'show' : ''}`}>
        <div className="game-over-text">Game Over</div>
        
        <div className="score-container">
          <div className="score-box">
            <div className="score-value">
              {score}/{totalRounds}
            </div>
            <div className="score-label">Score</div>
          </div>
          
          <div className="score-box">
            <div className="score-value">{accuracy}%</div>
            <div className="score-label">Accuracy</div>
          </div>
        </div>

        <div className="message-container">
          {accuracy >= 80 ? (
            <div className="result-message excellent">EXCELLENT!</div>
          ) : accuracy >= 60 ? (
            <div className="result-message great">GREAT JOB!</div>
          ) : accuracy >= 40 ? (
            <div className="result-message good">GOOD EFFORT!</div>
          ) : (
            <div className="result-message keep-trying">KEEP TRYING!</div>
          )}
        </div>

        <p className="play-again-text">Want to challenge again?</p>
        
        <div className="button-container">
          <button className="arcade-button yes-button" onClick={onRestart}>
            <span className="button-text">YES!</span>
          </button>
          <button className="arcade-button no-button" onClick={onBackToStart}>
            <span className="button-text">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
