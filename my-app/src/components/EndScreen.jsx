import React from "react";

const EndScreen = ({ score, attempts, onRestart, onBackToStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Game Over</h1>
        <p style={styles.score}>
          Your Score: {score} / {attempts}
        </p>
        <p style={styles.question}>Do you want to play again?</p>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.yes }} onClick={onRestart}>
            Yes
          </button>
          <button style={{ ...styles.button, ...styles.no }} onClick={onBackToStart}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2c2c54, #1e1e2f)", // dark arcade-like background
    boxSizing: "border-box",
    zIndex: 1000,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "800px",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    marginBottom: "1rem",
    color: "#ff4d6d",
  },
  score: {
    fontSize: "clamp(1.2rem, 3vw, 2rem)",
    marginBottom: "1.5rem",
    color: "#ff8a80",
  },
  question: {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
    marginBottom: "2rem",
    color: "#ffffff",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    padding: "12px 24px",
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    minWidth: "120px",
  },
  yes: {
    backgroundColor: "#22c55e",
    color: "white",
  },
  no: {
    backgroundColor: "#ff1744",
    color: "white",
  },
};

export default EndScreen;
