# 🎭 CharAIdes - Frontend

This is the React frontend for **CharAIdes**, a game where the player performs actions on webcam and an AI opponent tries to guess in real time. 

[See Backend](https://github.com/PennApps2025/BackAiCharades)

---

## 🚀 Tech Stack
- **React** (functional components + hooks)
- **Axios** for backend API communication
- **WebRTC (navigator.mediaDevices)** for webcam capture
- **Custom CSS** with arcade/neon theme

---

## ✨ Features
- 🎥 Live webcam feed
- ⏱️ Countdown timer for pose captures
- 📡 Frame-by-frame communication with backend (FastAPI)
- 💡 AI guesses displayed in real time
- 🎨 Responsive UI with neon arcade styling

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/PennApps2025/FrontAiCharades.git
cd FrontAiCharades/my-app
npm install
npm start

Frontend runs at:
👉 http://localhost:3000

This frontend expects the backend (FastAPI) to be running at:

http://localhost:8000
