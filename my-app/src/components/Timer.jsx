import React, { useState, useEffect, useRef } from "react";

const Timer = ({ duration, onTimeUp, paused = false, startSignal = 0 }) => {
  const durationMs = Math.max(0, (duration || 0) * 1000);
  const rafRef = useRef(null);
  const endTimeRef = useRef(null); // timestamp in ms when timer should hit 0
  const lastNowRef = useRef(null);
  const pausedRemainingRef = useRef(null); // ms remaining when paused
  const calledRef = useRef(false);
  const [, forceRerender] = useState(0); // used to re-render on RAF ticks

  useEffect(() => {
    // Reset on duration or startSignal change
    calledRef.current = false;
    pausedRemainingRef.current = null;
    endTimeRef.current = Date.now() + durationMs;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [durationMs, startSignal]);

  useEffect(() => {
    // Pause handling: freeze remaining ms and stop RAF
    if (paused) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (endTimeRef.current) {
        pausedRemainingRef.current = Math.max(0, endTimeRef.current - Date.now());
      }
      return;
    }

    // Resume: compute new endTime based on pausedRemaining if available
    const now = Date.now();
    if (pausedRemainingRef.current != null) {
      endTimeRef.current = now + pausedRemainingRef.current;
      pausedRemainingRef.current = null;
    } else if (!endTimeRef.current) {
      endTimeRef.current = now + durationMs;
    }

    const tick = () => {
      const now = Date.now();
      const remainingMs = Math.max(0, endTimeRef.current - now);

      // force a re-render to update styles
      forceRerender((v) => v + 1);

      if (remainingMs <= 0) {
        // finished
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        if (!calledRef.current) {
          calledRef.current = true;
          onTimeUp?.();
        }
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [paused, durationMs, onTimeUp, startSignal]);

  // compute progress [0..1]
  let progress = 1;
  if (paused && pausedRemainingRef.current != null) {
    progress = Math.max(0, pausedRemainingRef.current / durationMs);
  } else if (endTimeRef.current) {
    const now = Date.now();
    const remMs = Math.max(0, endTimeRef.current - now);
    progress = Math.max(0, remMs / durationMs);
  }

  const percent = Math.round(progress * 100);

  // color gradient
  const getGradientColor = (percent) => {
    const red = [244, 67, 54];
    const yellow = [255, 235, 59];
    const green = [76, 175, 80];

    let color;
    if (percent <= 50) {
      const factor = percent / 50;
      const r = red[0] + (yellow[0] - red[0]) * factor;
      const g = red[1] + (yellow[1] - red[1]) * factor;
      const b = red[2] + (yellow[2] - red[2]) * factor;
      color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    } else {
      const factor = (percent - 50) / 50;
      const r = yellow[0] + (green[0] - yellow[0]) * factor;
      const g = yellow[1] + (green[1] - yellow[1]) * factor;
      const b = yellow[2] + (green[2] - yellow[2]) * factor;
      color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
    return color;
  };

  const barColor = getGradientColor(percent);

  return (
    <div className="timer-bar-container">
      <div
        className="timer-bar-progress"
        style={{
          transform: `scaleX(${progress})`,
          backgroundColor: barColor,
        }}
      ></div>
    </div>
  );
};

export default Timer;
