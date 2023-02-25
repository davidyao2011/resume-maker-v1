import React, { useState } from "react";
import Loading from "./Loading";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTech, setCurrentTech] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);

  const handleAddCompany = () => {
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);
  };

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTech", currentTech);
    formData.append("workHistory", Json.stringify(companyInfo));

    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));
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
      <h3>Company you have worked at</h3>
      {companyInfo.map((company, index) => {
        return (
          <div className="nestedContainer" key={index}>
            <div className="companies">
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="companies">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                name="position"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="btn__group">
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button id="addBtn" onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button
                  id="deleteBtn"
                  onClick={() => handleRemoveCompany(index)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
      <button>Create your resume</button>
    </div>
  );
}
