import React, { useEffect, useState } from 'react';

const RoundIntro = ({ round, countFrom = 3, onDone }) => {
  const [count, setCount] = useState(countFrom);

  useEffect(() => {
    setCount(countFrom);
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      setCount((c) => {
        if (c <= 1) {
          clearInterval(interval);
          // small delay to allow final animation
          setTimeout(() => onDone?.(), 300);
          return 0;
        }
        return c - 1;
      });
    }, 700);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [countFrom, onDone]);

  return (
    <div style={styles.overlay} aria-live="polite">
      <div style={styles.card}>
        <h2 style={styles.round}>Round {round}</h2>
        <div style={styles.countContainer}>
          <span style={{ ...styles.count, ...(count === 0 ? styles.go : {}) }}>
            {count > 0 ? count : 'Go!'}
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 2000,
  },
  card: {
    padding: '30px 40px',
    borderRadius: 12,
    background: 'linear-gradient(135deg,#11111a,#1f1f2b)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    color: '#fff',
    fontSize: '2.4rem',
  },
  round: {
    margin: 0,
    color: '#9ca3ff',
    fontSize: '1.4rem',
    marginBottom: 12,
    opacity: 0.95,
  },
  countContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: '3.6rem',
    color: '#fff',
    fontWeight: 800,
    transform: 'scale(1)',
    transition: 'transform 0.25s ease, opacity 0.25s ease',
    opacity: 1,
  },
  go: {
    color: '#7c3aed',
    transform: 'scale(1.15)',
  },
};

export default RoundIntro;
