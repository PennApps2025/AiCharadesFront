import React, { useState, useEffect, useRef } from "react";

function CountdownTimer({ interval, onCapture, paused = false, score = 0, resetSignal }) {
  const [timeLeft, setTimeLeft] = useState(interval);

  // Ref to ensure we only trigger capture once per tick
  const capturedRef = useRef(false);

  // Reset timer when resetSignal changes (e.g., backend AI response arrived)
  useEffect(() => {
    if (resetSignal == null) return;
    setTimeLeft(interval);
    capturedRef.current = false;
  }, [resetSignal, interval]);

  useEffect(() => {
    if (paused) return; // do not start interval when paused

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (!capturedRef.current) {
            onCapture?.();
            capturedRef.current = true;
          }
          return interval; // reset timer
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
      <p className="countdown-text">Strike a pose: {timeLeft}</p>
      {/* Display only the user's score here */}
      <p className="capture-count">Score: {score}</p>
    </div>
  );
}

export default CountdownTimer;
