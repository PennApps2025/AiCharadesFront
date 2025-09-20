import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";
import RoundIntro from "./components/RoundIntro";

import { getRandomWord, sendFrameToBackend } from "./api/gameApi";

// Define the game duration in seconds.
const GAME_DURATION = 10;
const TOTAL_ROUNDS = 5;

function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'end'
  const [currentWord, setCurrentWord] = useState("");
  const [choices, setChoices] = useState([]);
  const [aiGuess, setAiGuess] = useState("");
  const [resultConfirmed, setResultConfirmed] = useState(null); // 'success', 'fail', null
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [showRoundIntro, setShowRoundIntro] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const roundEndedRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastSentTime = useRef(0);

  // When AI returns a guess, show it but do NOT end the round automatically.
  // This allows the player to keep trying until the timer expires.
  useEffect(() => {
    if (aiGuess && gameState === "playing") {
  const correct = aiGuess.toLowerCase().includes(currentWord.toLowerCase());
      if (correct) {
        // If AI guessed correctly, immediately end the round as success
        processRoundEnd(true);
        return;
      }
      // Otherwise just display/log the guess; do not end the round automatically.
    }
  }, [aiGuess, currentWord, gameState]);

  // Process end of round: show result message, then advance or end
  const processRoundEnd = (isCorrect) => {
    if (roundEndedRef.current) return; // prevent duplicates
    roundEndedRef.current = true;
    setResultConfirmed(isCorrect ? "success" : "fail");
    setResultMessage(isCorrect ? "Correct!" : "Wrong!");

    setTimeout(async () => {
      // update score
      if (isCorrect) setScore((s) => s + 1);

      // advance or end
      if (currentRound < TOTAL_ROUNDS) {
        setIsTransitioning(true);
        // prefetch next word to avoid flicker when swapping
        let nextData = null;
        try {
          nextData = await getRandomWord();
        } catch (e) {
          console.error("prefetch next word failed", e);
        }

        // small delay to allow CSS fade
        setTimeout(() => {
          if (nextData) {
            setCurrentWord(nextData.word);
            setChoices(nextData.choices);
          } else {
            // fallback to calling handleSkipWord if prefetch failed
            handleSkipWord();
          }
          setCurrentRound((r) => r + 1);
          setIsTransitioning(false);
          setShowRoundIntro(true);
        }, 180);
      } else {
        setGameState("end");
      }

      // clear result display
      setResultMessage(null);
      setResultConfirmed(null);
      // do NOT clear roundEndedRef here; it will be cleared when RoundIntro finishes
    }, 1000);
  };

  const handleStartGame = async () => {
    try {
      const data = await getRandomWord();
      setCurrentWord(data.word);
      setChoices(data.choices);
      setAiGuess("");
      setGameState("playing");
      setCurrentRound(1);
      setScore(0);
      // Show intro for round 1; RoundIntro will call onDone
      setShowRoundIntro(true);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  const handlePlayAgain = () => {
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
    setAiGuess("");
  };

  // --- Timer expiration ---
  const handleTimeUp = () => {
    // Treat time up as incorrect guess
    processRoundEnd(false);
  };

  return (
    <div className="App-container">
      {gameState === "start" && <h1>AI Charades</h1>}

      {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

      {gameState === "playing" && (
        <>
        {showRoundIntro && (
          <RoundIntro
            round={currentRound}
            onDone={() => {
              setShowRoundIntro(false);
              // allow next round to be ended when appropriate
              roundEndedRef.current = false;
            }}
          />
        )}
        <GameScreen
          currentWord={currentWord}
          aiGuess={aiGuess}
          onCapture={handleSendFrame}
          duration={GAME_DURATION}
          onTimeUp={handleTimeUp}
          onSkipWord={handleSkipWord}
          onQuit={handleQuitGame}
          currentRound={currentRound}
          paused={showRoundIntro}
          isTransitioning={isTransitioning}
        />
        </>
      )}

      {gameState === "end" && (
        <EndScreen score={score} totalRounds={TOTAL_ROUNDS} onRestart={handleStartGame} />
      )}
      {resultMessage && (
        <div style={resultStyles.overlay}>
          <div style={resultStyles.card}>{resultMessage}</div>
        </div>
      )}
    </div>
  );
}

export default App;

const resultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 3000,
    pointerEvents: 'none',
  },
  card: {
    marginTop: 20,
    padding: '8px 16px',
    borderRadius: 8,
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 700,
    pointerEvents: 'none',
  },
};
