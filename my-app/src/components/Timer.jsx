import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // When time runs out, call the parent function and stop the timer.
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Set up an interval to decrease the time every second.
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component is no longer on screen.
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const progressPercentage = (timeLeft / duration) * 100;

  // --- NEW LOGIC FOR SMOOTH COLOR TRANSITION ---
  const getGradientColor = (percent) => {
    // Define the key colors in RGB format
    const red = [244, 67, 54];
    const yellow = [255, 235, 59];
    const green = [76, 175, 80];

    let color;
    if (percent <= 50) {
      // Transition from Red to Yellow (0% to 50%)
      const factor = percent / 50;
      const r = red[0] + (yellow[0] - red[0]) * factor;
      const g = red[1] + (yellow[1] - red[1]) * factor;
      const b = red[2] + (yellow[2] - red[2]) * factor;
      color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    } else {
      // Transition from Yellow to Green (50% to 100%)
      const factor = (percent - 50) / 50;
      const r = yellow[0] + (green[0] - yellow[0]) * factor;
      const g = yellow[1] + (green[1] - yellow[1]) * factor;
      const b = yellow[2] + (green[2] - yellow[2]) * factor;
      color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
    return color;
  };

  const barColor = getGradientColor(progressPercentage);

  return (
    <div className="timer-bar-container">
      <div
        className="timer-bar-progress"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: barColor, // Set the background color dynamically
        }}
      ></div>
    </div>
  );
};

export default Timer;
