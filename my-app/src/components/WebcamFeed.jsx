// WebcamFeed.jsx
import React, { useRef, useEffect, memo } from "react";

/**
 * WebcamFeed component
 * - Captures video from user's webcam
 * - Sends frames to the backend every 2 seconds
 * - Memoized to prevent unnecessary re-renders and blinking
 */
const WebcamFeed = memo(({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }

    getCamera();

    // Capture frames every n seconds
    const intervalId = setInterval(() => {
      if (!videoRef.current || !onCapture) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Convert canvas to Blob and send
        canvas.toBlob((blob) => {
          if (blob) onCapture(blob);
        }, "image/jpeg");
      }
    }, 4000); // n000 milliseconds = n seconds

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onCapture]);

  return (
    <div className="webcam-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          objectFit: "cover",
          backgroundColor: "#000",
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
});

export default WebcamFeed;
