"use client";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // get the blended image URL from localStorage
    const url = localStorage.getItem("blendURL");
    if (url) {
      setImageUrl(url);
      handleUploadResult(url); // send to API
    }
  }, []);

  const handleUploadResult = async (imageUrl) => {
    try {
      const res = await fetch("https://art-backend-6mu2.onrender.com/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Uploaded image URL:", data.url);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (err) {
      console.error("Error uploading via URL:", err);
    }
  };

  const handleFinish = () => {
    if (submitting) return;
    setSubmitting(true);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        textAlign: "center",
        background: "#fcfbf4",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // disable scrolling
      }}
    >
      {imageUrl ? (
        <>
          <h1 className="header-text" style={{ marginBottom: "1rem" }}>
            Your Final Artwork
          </h1>
          <img
            src={imageUrl}
            alt="Blended Artwork"
            style={{
              maxWidth: "80vw",   // fits screen width
              maxHeight: "80vh",  // fits screen height
              height: "auto",
              width: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              objectFit: "contain",
            }}
          />
          <button
            onClick={handleFinish}
            disabled={submitting}
            style={{
              marginTop: "2rem",
              background: "#4CAF50",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Finish
          </button>
        </>
      ) : (
        <div>
          <h1 className="header-text">Loading your artwork...</h1>
          <img
            src="/draw2.gif"
            alt="Loading..."
            style={{ width: "300px", marginTop: "1rem" }}
          />
        </div>
      )}
    </div>
  );
}
