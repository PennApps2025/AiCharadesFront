# 🎭 CharAIdes - Frontend

**🏆 Winner — Most Creative Hack at PennApps XXVI**

CharAIdes is a real-time, AI-powered charades frontend where a player acts out a word on webcam and an AI (via our backend) tries to guess it. Built for **[PennApps XXVI](https://devpost.com/software/ai-charade)**, this frontend focuses on low-latency webcam capture, smooth UX, and a neon/arcade visual theme.

## 💡 Inspiration
We wanted to blend physical play with modern AI: take classic charades and let an AI act as the judge in real-time. That makes the game playable anywhere — solo, remote with friends, or in group settings without a human judge.

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

Backend & AI (for context)
- Backend: FastAPI (Python) with SQLite for leaderboard persistence  
- AI: Gemini API for vision/LLM-based image interpretation

(See backend repo: https://github.com/PennApps2025/BackAiCharades)

## 🛠 How we built it
- React components for StartScreen, GameScreen, Webcam/Canvas capture, CountdownTimer, EndScreen, and Leaderboard.
- Game state management handles rounds, attempts, score, and AI responses.
- Frames are posted to the FastAPI backend which queries Gemini API and returns structured guesses/results.
- Leaderboard endpoints accept score submissions and return the top-10.

## ⚠️ Challenges & fixes
- Timer vs animation desync — fixed by driving visuals with real ms using requestAnimationFrame + transform scaleX.
- Debouncing API calls — limited requests to avoid overloading Gemini (throttle + state guards).
- Preventing webcam reloads on state changes — separated state and used useCallback to avoid unnecessary remounts.
- AI guess strictness — refined prompt engineering and response parsing to match a curated word list.

## 🏆 Accomplishments
- Seamless generative-AI interpretation of human gestures in near real-time.
- Smooth UX without camera flicker or frequent remounts.
- Reliable leaderboard and round management with polished end-game flow.

## 📚 What we learned
- Real-time webcam + AI requires careful state & render management to keep UX smooth.
- Small optimizations (API throttling, canvas pre-sizing) greatly improve responsiveness.
- Prompt design is crucial when using generative models for constrained classification tasks.

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