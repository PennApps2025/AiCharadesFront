import React, { useState, useEffect, useRef } from "react";

function CountdownTimer({ interval, onCapture, paused = false }) {
  const [timeLeft, setTimeLeft] = useState(interval);
  const [captureCount, setCaptureCount] = useState(0);

  // Ref to track if we've captured for this tick
  const capturedRef = useRef(false);

  useEffect(() => {
    if (paused) return; // do not start interval when paused

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (!capturedRef.current) {
            // Trigger capture exactly once
            onCapture?.();
            setCaptureCount((c) => c + 1);
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
      <p className="countdown-text">Strike a pose in: {timeLeft}s</p>
      <p className="capture-count">Total attemps: {captureCount}</p>
    </div>
  );
}

export default CountdownTimer;
