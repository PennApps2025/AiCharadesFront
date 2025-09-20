import React, { useRef, useEffect } from "react";

// This is the functional code for the WebcamFeed component.
const WebcamFeed = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // This effect runs once when the component mounts to start the camera.
  useEffect(() => {
    // An async function to get access to the user's camera.
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        // You could display an error message to the user here.
      }
    }

    getCamera();

    // Setup the interval to capture frames every 2 seconds.
    const intervalId = setInterval(() => {
      if (videoRef.current && onCapture) {
        // Draw the current video frame to the hidden canvas.
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          // Convert the canvas image to a Blob and send it.
          canvas.toBlob((blob) => {
            onCapture(blob);
          }, "image/jpeg");
        }
      }
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup function: This runs when the component is unmounted.
    return () => {
      clearInterval(intervalId); // Stop capturing frames.
      if (videoRef.current && videoRef.current.srcObject) {
        // Stop all video tracks to turn off the camera light.
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onCapture]); // Re-run the effect if onCapture changes.

  return (
    <div className="webcam-display">
      <video
        ref={videoRef}
        autoPlay // Important: makes the video play automatically.
        playsInline // Important: for mobile browsers.
        muted // Important: browsers often block autoplaying video with sound.
        style={{ width: "100%", maxWidth: "640px", borderRadius: "8px" }}
      />
      {/* A hidden canvas used for capturing frames from the video. */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default WebcamFeed;
