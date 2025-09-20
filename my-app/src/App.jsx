import React, { useState, useEffect, useRef } from "react";

// --- CSS Styles defined as JavaScript Objects ---

const styles = {
  // Main container for all screens
  screenContainer: {
    backgroundColor: "#1a202c", // bg-gray-900
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  // Game title
  title: {
    fontSize: "3.75rem", // text-6xl
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#22d3ee", // text-cyan-400
  },
  // Subtitle text
  subtitle: {
    fontSize: "1.25rem", // text-xl
    color: "#d1d5db", // text-gray-300
    marginBottom: "2rem",
  },
  // Base button style
  button: {
    backgroundColor: "#06b6d4", // bg-cyan-500
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem 2rem",
    borderRadius: "0.5rem",
    fontSize: "1.5rem", // text-2xl
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
  // Style for the container holding the webcam video
  videoContainer: {
    width: "100%",
    maxWidth: "42rem", // max-w-2xl
    backgroundColor: "#1f2937", // bg-gray-800
    borderRadius: "0.5rem", // rounded-lg
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // shadow-xl
    padding: "1.5rem",
  },
  // Style for the video element itself
  video: {
    width: "100%",
    height: "100%",
    borderRadius: "0.375rem", // rounded-md
    transform: "scaleX(-1)", // Flips video like a mirror
  },
};

// A simple component for our main application
function App() {
  const [gameState, setGameState] = useState("ready"); // 'ready', 'running', 'success'
  const videoRef = useRef(null); // A reference to our <video> element
  const [isButtonHovered, setIsButtonHovered] = useState(false); // For button hover effect

  const handleGameStart = () => {
    setGameState("running");
  };

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

  // Combine base button style with hover styles
  const buttonStyle = {
    ...styles.button,
    backgroundColor: isButtonHovered ? "#0891b2" : "#06b6d4", // hover:bg-cyan-600
    transform: isButtonHovered ? "scale(1.05)" : "scale(1)", // hover:scale-105
  };

  if (gameState === "ready") {
    return (
      <div style={styles.screenContainer}>
        <h1 style={styles.title}>AI Charades</h1>
        <p style={styles.subtitle}>
          Let's see if the AI can guess what you're acting out!
        </p>
        <button
          style={buttonStyle}
          onClick={handleGameStart}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Game Play
        </button>
      </div>
    );
  }

  if (gameState === "running") {
    return (
      <div style={styles.screenContainer}>
        <div style={styles.videoContainer}>
          <video ref={videoRef} autoPlay playsInline style={styles.video} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.screenContainer}>
      <p>Loading...</p>
    </div>
  );
}

export default App;
