import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";

export default function CreatePost() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [year, setYear] = useState("");
  const [jobType, setJobType] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState(""); // Added state for title

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setStudentEmail(email);
    }
  }, []);

  // Function to generate title based on company name, year, and job type
  useEffect(() => {
    if (companyName && year && jobType) {
      const generatedTitle = `${companyName} ${year} ${jobType}`;
      setTitle(generatedTitle);
    }
  }, [companyName, year, jobType]);

  async function createNewPost(ev) {
    ev.preventDefault();

    if (!studentName || !companyName || !year || !jobType || !summary || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const postData = {
      studentEmail,
      studentName,
      companyName,
      year,
      jobType,
      summary,
      content,
      title, // Include generated title in post data
    };

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/Home" />;
  }

  const handleContentChange = (htmlValue) => {
    setContent(htmlValue);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="blog-container">
      <form onSubmit={createNewPost} className="blog-form">
        <div className="title">
          <input
            type="text"
            placeholder="Student Name *"
            value={studentName}
            onChange={(ev) => setStudentName(ev.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company Name *"
            value={companyName}
            onChange={(ev) => setCompanyName(ev.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year *"
            value={year}
            onChange={(ev) => setYear(ev.target.value)}
            required
          />
          <select
            value={jobType}
            onChange={(ev) => setJobType(ev.target.value)}
            required
          >
            <option value="">Select Job Type *</option>
            <option value="internship">Internship</option>
            <option value="fulltime">Full Time</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Summary *"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="blog-input"
          required
        />
        <div className="content">
          <ReactQuill
            style={{
              minWidth: "70vw",
              minHeight: "50vh",
              paddingBottom: "6vh",
            }}
            value={content}
            theme="snow"
            onChange={handleContentChange}
            modules={modules}
          />
        </div>
        <button type="submit" className="blog-button">
          Create post
        </button>
      </form>
    </div>
  );
}
