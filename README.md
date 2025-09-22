# 🤖 CharAIdes - Frontend

**🏆 Winner — Most Creative Hack at PennApps XXVI**

CharAIdes is a real-time, AI-powered charades frontend where a player acts out a word on webcam and an AI (via our backend) tries to guess it. Built for **[PennApps XXVI](https://devpost.com/software/ai-charade)**, this frontend focuses on low-latency webcam capture, smooth UX, and a neon/arcade visual theme.

[See Backend](https://github.com/PennApps2025/BackAiCharades)

## ✅ What it does
- Capture live webcam frames and send them to the backend for analysis
- AI makes instant guesses based on visual input
- Round-based play with a per-round timer
- Attempt-based scoring across multiple rounds
- End screen with nickname entry and leaderboard submission

## 🧩 Frontend features
- Real-time webcam feed & canvas capture
- Countdown timer with synchronized animation
- Attempt tracking, live score display, and end-screen flow
- Leaderboard UI (fetch & submit via API)
- Polished arcade/neon styling and responsive layouts

## 🚀 Tech Stack
- Frontend: React (Vite) — functional components & hooks  
- Networking: Axios for REST API calls to backend endpoints (e.g., /leaderboard, /guess)  
- Browser APIs: MediaDevices API, Canvas for frame capture  
- Styling: Custom CSS (neon/arcade theme)

## 🔭 What's next
- Expand the word list with nuanced gestures.
- Add multiplayer modes (competitive / cooperative).
- Experiment with multimodal prompts (audio + visual) to enrich AI judgments.

## ⚡ Getting started (frontend)
1. Clone and install
```bash
git clone https://github.com/PennApps2025/FrontAiCharades.git
cd FrontAiCharades/my-app
npm install
npm start
```
2. Open: http://localhost:3000  
3. Backend expected at: http://localhost:8000 (FastAPI)
