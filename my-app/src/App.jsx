import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";
import RoundIntro from "./components/RoundIntro";

import { getRandomWord, sendFrameToBackend } from "./api/gameApi";

// Define the game duration in seconds.
const GAME_DURATION = 10; // seconds for the whole match

function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'end'
  const [currentWord, setCurrentWord] = useState("");
  const [choices, setChoices] = useState([]);
  // store full backend response: { guess, result, response }
  const [aiResponse, setAiResponse] = useState(null);
  const [aiResponseKey, setAiResponseKey] = useState(0);
  const [resultConfirmed, setResultConfirmed] = useState(null); // 'success', 'fail', null
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resultMessage, setResultMessage] = useState(null);
  const [gameStartKey, setGameStartKey] = useState(0); // increment to reset timer / start new game
  const [displayedGuess, setDisplayedGuess] = useState("");
  const overlayTimeoutRef = useRef(null);
  const lastSentTime = useRef(0);

  // When AI returns a guess, show an overlay for correct/incorrect.
  // If correct, increment score and immediately fetch a new word so player can continue.
  useEffect(() => {
    if (aiResponse && gameState === "playing") {
      const isSuccess = aiResponse.result === "success";
      setResultConfirmed(isSuccess ? "success" : "fail");
      setResultMessage(isSuccess ? "Correct!" : "Incorrect");

      // show the backend response text while the overlay is visible
      const text = aiResponse.response || aiResponse.guess || "";
      setDisplayedGuess(text);

      // clear any existing overlay timeout
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
        overlayTimeoutRef.current = null;
      }

      overlayTimeoutRef.current = setTimeout(() => {
        setResultMessage(null);
        setResultConfirmed(null);
        setDisplayedGuess("");
        // keep `aiResponse` so the latest backend response persists in state
        overlayTimeoutRef.current = null;
      }, 1500);

      if (isSuccess) {
        setScore((s) => s + 1);
        (async () => {
          try {
            const data = await getRandomWord();
            setCurrentWord(data.word);
            setChoices(data.choices);
          } catch (e) {
            console.error("prefetch next word failed", e);
          }
        })();
      }
      // bump key so countdown timers listening to resetSignal can restart
      setAiResponseKey((k) => k + 1);
    }
    // cleanup on unmount
    return () => {
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
        overlayTimeoutRef.current = null;
      }
    };
  }, [aiResponse, gameState]);

  // Clear overlay and related transient state whenever the game stops playing
  useEffect(() => {
    if (gameState !== "playing") {
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
        overlayTimeoutRef.current = null;
      }
      setResultMessage(null);
      setResultConfirmed(null);
      setDisplayedGuess("");
    }
  }, [gameState]);

  // No per-round end processing: the global match ends when the timer expires.

  const handleStartGame = async () => {
    try {
      const data = await getRandomWord();
      setCurrentWord(data.word);
      setChoices(data.choices);
      setAiResponse(null);
      setScore(0);
      setAttempts(0);
      // show round intro first, then actually start playing after intro completes
      setGameState("intro");
      // bump start key anyway so timer components stay deterministic
      setGameStartKey((k) => k + 1);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };
  const handleBackToStart = () => {
    setGameState("start");
  };


  const handleIntroComplete = () => {
    setGameState("playing");
  };

  const handlePlayAgain = () => {
    setGameState("start");
  };

  const handleSendFrame = useCallback(
    async (imageBlob) => {
      if (!imageBlob) return;

    const now = Date.now();
    if (now - lastSentTime.current < 2800) {
      return;
    }
    lastSentTime.current = now;

    try {
      const data = await sendFrameToBackend(imageBlob, currentWord, choices);
      // store the full response object
      setAiResponse(data);
      setAttempts(prev => prev + 1);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
  }, [currentWord, choices]);

  const handleSkipWord = useCallback(async () => {
    try {
      const data = await getRandomWord();
      setCurrentWord(data.word);
      setChoices(data.choices);
      setResultConfirmed(null);
    } catch (err) {
      console.error("Error fetching new word:", err);
    }
  }, []);

  const handleQuitGame = () => {
    setGameState("start");
    setCurrentWord("");
    setChoices([]);
    setAiResponse(null);
  };

  // --- Timer expiration ---
  const handleTimeUp = () => {
    // End the overall game when the global timer finishes
    setGameState("end");
  };

  return (
    <div className="App-container">
      {gameState === "start" && <h1>AI Charades</h1>}

      {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

      {gameState === "intro" && (
        <RoundIntro onComplete={handleIntroComplete} />
      )}

      {gameState === "playing" && (
        <GameScreen
          currentWord={currentWord}
          aiGuess={aiResponse?.response || aiResponse?.guess || ""}
          resetSignal={aiResponseKey}
          onCapture={handleSendFrame}
          duration={GAME_DURATION}
          onTimeUp={handleTimeUp}
          onSkipWord={handleSkipWord}
          onQuit={handleQuitGame}
          paused={false}
          startSignal={gameStartKey}
        />
      )}
      {gameState === "end" && (
        <EndScreen
          score={score}
          totalRounds={attempts} 
          onRestart={handleStartGame}
          onBackToStart={handleBackToStart}
        />
      )}
      {/* Animated guess overlay (success: green circle, fail: red X) */}
      <div className="guess-overlay">
        <div
          className={`guess-card ${resultMessage ? "show" : ""}`}
          aria-hidden={!resultMessage}
        >
          <div
            className={`guess-icon ${
              resultConfirmed === "success" ? "success" : "fail"
            }`}
            aria-hidden={!resultMessage}
          >
            {resultConfirmed === "success" ? "O" : "X"}
          </div>
        </div>
        {/* AI response text is displayed in the GameScreen robot area (AIGuessDisplay) */}
      </div>
    </div>
  );
}

export default App;