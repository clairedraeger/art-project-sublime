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
      handleUploadResult(url); // send to APIs
    }
  }, []);

  const handleUploadResult = async (imageUrl) => {
    try {
      // 1️⃣ Upload via /url route
      const res1 = await fetch("https://art-backend-6mu2.onrender.com/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      const data1 = await res1.json();
      if (res1.ok) {
        console.log("Uploaded image URL via /url:", data1.url);
      } else {
        console.error("Upload via /url failed:", data1.error);
      }

      // Save image URL via /imagehost/save
      const res2 = await fetch("https://art-backend-6mu2.onrender.com/imagehost/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      const data2 = await res2.json();
      if (res2.ok) {
        console.log("Saved image URL via /imagehost/save:", data2);
      } else {
        console.error("Save via /imagehost/save failed:", data2.error);
      }

    } catch (err) {
      console.error("Error uploading image URL:", err);
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
        overflow: "hidden",
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
              maxWidth: "80vw",
              maxHeight: "80vh",
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
