import React, { useEffect, useState } from "react";
import { submitScore } from "../api/gameApi";
import "./EndScreen.css";

const EndScreen = ({ score, totalRounds, onRestart, onBackToStart, onShowLeaderboard }) => {
  const [showContent, setShowContent] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const accuracy = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  
  useEffect(() => {
    // 애니메이션을 위한 딜레이
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleSaveScore = () => {
    setShowNameInput(true);
  };

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setSubmitError("Please enter a nickname");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitScore(username, score);
      setShowNameInput(false);
      setShowPlayAgain(true);
    } catch (error) {
      setSubmitError("Failed to save score. Please try again.");
      setIsSubmitting(false);
    }
  };

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

        {!showNameInput && !showPlayAgain ? (
          <>
            <p className="play-again-text">Want to save your score?</p>
            <div className="button-container" style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
              <button className="arcade-button save-button initial-choice" onClick={handleSaveScore}>
                <span className="button-text">Save Score</span>
              </button>
              <button 
                className="arcade-button no-button initial-choice" 
                onClick={() => setShowPlayAgain(true)}
              >
                <span className="button-text">No Thanks</span>
              </button>
            </div>
          </>
        ) : showPlayAgain ? (
          <>
            <p className="play-again-text">Play again?</p>
            <div className="button-container">
              <button className="arcade-button yes-button" onClick={onRestart}>
                <span className="button-text">YES!</span>
              </button>
              <button className="arcade-button no-button" onClick={onBackToStart}>
                <span className="button-text">EXIT</span>
              </button>
            </div>
            <div className="button-container" style={{ marginTop: '1rem' }}>
              <button 
                className="arcade-button leaderboard-button full-width" 
                onClick={onShowLeaderboard}
                style={{ width: '100%', maxWidth: '400px' }}
              >
                <span className="button-text">Leaderboard</span>
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitScore} className="nickname-form">
            <div className="input-container">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your nickname"
                maxLength="15"
                className="nickname-input"
                disabled={isSubmitting}
              />
              {submitError && <div className="error-message">{submitError}</div>}
            </div>
            <div className="button-container" style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
              <button 
                type="submit" 
                className="arcade-button save-button initial-choice"
                disabled={isSubmitting}
              >
                <span className="button-text">
                  {isSubmitting ? "Saving..." : "Submit"}
                </span>
              </button>
              <button 
                type="button"
                className="arcade-button no-button initial-choice"
                onClick={() => setShowNameInput(false)}
                disabled={isSubmitting}
              >
                <span className="button-text">Cancel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EndScreen;
