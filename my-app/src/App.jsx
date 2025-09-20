import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Import the new CSS file

// A simple component for our main application
function App() {
  const [gameState, setGameState] = useState("ready"); // 'ready', 'running', 'success'
  const videoRef = useRef(null); // A reference to our <video> element

  const handleGameStart = () => {
    setGameState("running");
  };

  // This effect handles the webcam logic
  useEffect(() => {
    if (gameState === "running") {
      const startWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
          setGameState("ready");
        }
      };
      startWebcam();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [gameState]);

  if (gameState === "ready") {
    return (
      <div className="screen-container">
        <h1 className="title">AI Charades</h1>
        <p className="subtitle">
          Let's see if the AI can guess what you're acting out!
        </p>
        <button className="button" onClick={handleGameStart}>
          Game Play
        </button>
      </div>
    );
  }

  if (gameState === "running") {
    return (
      <div className="screen-container">
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline className="video" />
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <p>Loading...</p>
    </div>
  );
}

export default App;
