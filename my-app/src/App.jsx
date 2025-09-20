import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import WinCondition from "./components/WinCondition";

import { getRandomWord, sendFrameToBackend } from "./api/gameApi";


// Define the game duration in seconds.
const GAME_DURATION = 10;

function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'won'
  const [currentWord, setCurrentWord] = useState("");
  const [choices, setChoices] = useState([]);
  const [aiGuess, setAiGuess] = useState("");
  const lastSentTime = useRef(0);

  // This effect checks for the win condition whenever the AI makes a new guess.
  useEffect(() => {
    if (gameState === "playing" && aiGuess && currentWord) {
      if (aiGuess.toLowerCase().includes(currentWord.toLowerCase())) {
        setGameState("won");
      }
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
    setGameState("won");
  };

  // This function is passed down to the Timer component.
  // The Timer component will call this function when it reaches zero.
  const handleTimeUp = () => {
    console.log("Time is up!");
    // You can create a separate "Time's Up" screen later.
    // For now, we'll reuse the 'won' screen.
    setGameState("won");
  };

  const handleSendFrame = async (imageBlob) => {
    if (!imageBlob) return;

    const now = Date.now();
    if (now - lastSentTime < 5000) {
      return;
    }
    lastSentTime.current = now;

    try {
      const data = await sendFrameToBackend(imageBlob, currentWord, choices);
      setAiGuess(data.guess);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
  };

  const handleQuitGame = () => {
    setGameState("start");
    setCurrentWord("");
    setChoices([]);
    setAiGuess("");
  };

  return (
    <div className="App-container">
      <h1>AI Charades 🤖💃</h1>

      {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

      {gameState === "playing" && (
        <GameScreen
          word={currentWord}
          aiGuess={aiGuess}
          onCapture={handleSendFrame}
          // --- CHANGED (for Option 2) ---
          // Pass the duration and the callback function instead of timeLeft.
          duration={GAME_DURATION}
          onTimeUp={handleTimeUp}
          onSkipWord={handleStartGame}
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
