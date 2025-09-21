import React, { useState, useEffect, useRef } from "react";

function CountdownTimer({ interval, onCapture, paused = false, score = 0, resetSignal }) {
  const [timeLeft, setTimeLeft] = useState(interval);

  // Ref to ensure we only trigger capture once per tick
  const capturedRef = useRef(false);
  // When a capture is triggered we wait for backend response and keep display at 1
  const waitingForResponseRef = useRef(false);
  // internal attempts counter (incremented when a capture is triggered)
  const [attempts, setAttempts] = useState(0);

  // Reset timer when resetSignal changes (e.g., backend AI response arrived)
  useEffect(() => {
    if (resetSignal == null) return;
    setTimeLeft(interval);
    capturedRef.current = false;
    waitingForResponseRef.current = false;
  }, [resetSignal, interval]);

  useEffect(() => {
    if (paused) return; // do not start interval when paused

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // if we're currently waiting for backend response, keep showing 1
        if (waitingForResponseRef.current) return prev;

        if (prev <= 1) {
          if (!capturedRef.current) {
            onCapture?.();
            setAttempts((a) => a + 1);
            capturedRef.current = true;
            // enter wait mode: show 1 until resetSignal
            waitingForResponseRef.current = true;
          }
          return 1; // stay at 1 while waiting
        } else {
          capturedRef.current = false; // reset capture flag
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interval, onCapture, paused]);

  return (
    <div className="countdown-arcade">
      <p className="capture-count">Score: {score}</p>
      <p className="attempts-count">Attempts: {attempts}</p>
      <p className="countdown-text">Strike a pose in: {timeLeft}</p>
    </div>
  );
}

export default CountdownTimer;
