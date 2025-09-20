import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import WinCondition from "./components/WinCondition";

// A simple list of words for the hackathon.
const WORD_LIST = [
  "dancing",
  "waving",
  "jumping",
  "eating",
  "sleeping",
  "reading",
  "driving",
  "singing",
];

// Define the game duration in seconds.
const GAME_DURATION = 10;

function App() {
  // 'start', 'playing', 'won'
  const [gameState, setGameState] = useState("start");
  const [currentWord, setCurrentWord] = useState("");
  const [aiGuess, setAiGuess] = useState("");

  // This effect checks for the win condition whenever the AI makes a new guess.
  useEffect(() => {
    if (gameState === "playing" && aiGuess && currentWord) {
      // Simple win condition: check if the AI's guess includes the correct word.
      if (aiGuess.toLowerCase().includes(currentWord.toLowerCase())) {
        setGameState("won");
      }
    }
  }, [aiGuess, currentWord, gameState]);

  // Function to select a random word and start the game.
  const handleStartGame = () => {
    const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setCurrentWord(newWord);
    setAiGuess(""); // Reset previous guess
    setGameState("playing");
  };

  // Function to handle restarting the game after a win.
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

  // Function passed to the WebcamFeed component to send frames to the backend.
  const handleSendFrame = async (imageBlob) => {
    if (!imageBlob) return;

    const formData = new FormData();
    formData.append("file", imageBlob, "capture.jpg");
    formData.append("word", currentWord);

    try {
      const response = await axios.post(
        "http://localhost:8000/guess",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAiGuess(response.data.guess);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
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
        />
      )}

      {gameState === "won" && (
        <WinCondition word={currentWord} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
