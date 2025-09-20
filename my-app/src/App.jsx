import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import WinCondition from "./components/WinCondition";

import { getRandomWord, sendFrameToBackend } from "./api/gameApi";


// Define the game duration in seconds.
const GAME_DURATION = 1000;

function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'won'
  const [currentWord, setCurrentWord] = useState("");
  const [choices, setChoices] = useState([]);
  const [aiGuess, setAiGuess] = useState("");
  const [resultConfirmed, setResultConfirmed] = useState(null); // 'success', 'fail', null
  const lastSentTime = useRef(0);

  // Automatically confirm result n seconds after AI guess is updated
  useEffect(() => {
    if (aiGuess && gameState === "playing") {
      const timer = setTimeout(() => {
        if (aiGuess.toLowerCase().includes(currentWord.toLowerCase())) {
          setResultConfirmed("success");
          setGameState("won");
        } else {
          setResultConfirmed("fail");
          // continue game or handle fail logic
        }
      }, 1000); // 1 second display

      return () => clearTimeout(timer); // cancel previous timer if aiGuess changes
    }
  }, [aiGuess, currentWord, gameState]);

  const handleStartGame = async () => {
    try {
      const data = await getRandomWord();
      setCurrentWord(data.word);
      setChoices(data.choices);
      setAiGuess("");
      setGameState("playing");
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  const handlePlayAgain = () => {
    setGameState("start");
  };

  // This function is passed down to the Timer component.
  // The Timer component will call this function when it reaches zero.
  const handleTimeUp = () => {
    console.log("Time is up!");
    // You can create a separate "Time's Up" screen later.
    // For now, we'll reuse the 'won' screen.
    setGameState("start");
  };

  const handleSendFrame = useCallback(async (imageBlob) => {
    if (!imageBlob) return;

    const now = Date.now();
    if (now - lastSentTime.current < 4000) {
      return;
    }
    lastSentTime.current = now;

    try {
      const data = await sendFrameToBackend(imageBlob, currentWord, choices);
      setAiGuess(data.guess);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
  }, []);

  const handleSkipWord = useCallback(async () => {
  try {
    const data = await getRandomWord();
    setCurrentWord(data.word);
    setChoices(data.choices);
    setResultConfirmed(null);
  } catch (err) {
    console.error("Error fetching new word:", err);
  }
});

  const handleQuitGame = () => {
    setGameState("start");
    setCurrentWord("");
    setChoices([]);
    setAiGuess("");
  };

  return (
    <div className="App-container">
      {gameState === "start" && <h1>AI Charades</h1>}

      {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

      {gameState === "playing" && (
        <GameScreen
          currentWord={currentWord}
          aiGuess={aiGuess}
          // onCapture={handleSendFrame}
          duration={GAME_DURATION}
          onTimeUp={handleTimeUp}
          onSkipWord={handleSkipWord}
          onQuit={handleQuitGame}
        />
      )}

      {gameState === "won" && (
        <WinCondition word={currentWord} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
