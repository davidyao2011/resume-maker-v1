import React, { useState } from "react";
import Loading from "./Loading";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTech, setCurrentTech] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      currentPosition,
      currentLength,
      currentTech,
      headshot,
    });
    setLoading(true);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <h1> Resume Maker</h1>
      <p>Create a resume using AI in a faster way</p>
      <form onSubmit={handleFormSubmit} method="POST" enctype="multipart/form">
        <label htmlFor="fullName">Enter your full name</label>
        <input
          type="text"
          required
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </form>
      <div className="nestedContainer">
        <div>
          <label htmlFor="currentPosition">Current Position</label>
          <input
            type="text"
            required
            name="currentPosition"
            id="currentPosition"
            className="currentInput"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currentLength">How many years?</label>
          <input
            type="number"
            name="currentLength"
            id="currentLength"
            required
            className="currentInput"
            value={currentLength}
            onChange={(e) => setCurrentLength(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currentTech">Tech used</label>
          <input
            type="text"
            name="currentTech"
            id="currentTech"
            required
            className="currentInput"
            value={currentTech}
            onChange={(e) => setCurrentTech(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="photo">Upload your image</label>
      <input
        type="file"
        name="photo"
        id="photo"
        required
        accept="image/x-png, image/jpeg"
        onChange={(e) => setHeadshot(e.target.files[0])}
      />
      <button>Create your resume</button>
    </div>
  );
}
