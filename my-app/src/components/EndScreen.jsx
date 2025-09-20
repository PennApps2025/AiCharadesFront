import React from "react";

const EndScreen = ({ score, totalRounds, onRestart }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Game Over</h1>
      <p style={styles.score}>
        Your Score: {score} / {totalRounds}
      </p>
      <button style={styles.button} onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  score: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
};

export default EndScreen;
