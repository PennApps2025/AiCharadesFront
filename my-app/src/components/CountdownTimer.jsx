import React, { useState, useEffect } from "react";

function CountdownTimer({ interval }) {
  const [timeLeft, setTimeLeft] = useState(interval);

  useEffect(() => {
    // decrease countdown every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return interval; // reset countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [interval]);

  return (
    <div className="countdown">
      <p>Next capture in: {timeLeft}s</p>
    </div>
  );
}

export default CountdownTimer;
