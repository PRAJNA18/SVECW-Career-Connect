import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";

export default function CreatePost() {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      // Fetch existing post data based on ID
      fetchPostData();
    }
  }, [id]);

  async function fetchPostData() {
    try {
      const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        // Populate form fields with existing post data
        setStudentName(data.studentName);
        setCompanyName(data.companyName);
        setYear(data.year);
        setJobType(data.jobType);
        setSummary(data.summary);
        setContent(data.content);
        setTitle(data.title);
      } else {
        console.error('Failed to fetch post data');
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }


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
      let response;
      if (id) {
        // If editing an existing post, send PUT request
        response = await fetch(`http://localhost:8080/api/blogs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
          credentials: 'include',
        });
      } else {
        // If creating a new post, send POST request
        response = await fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
          credentials: 'include',
        });
      }


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
          {id ? 'Update post' : 'Create post'}
        </button>
      </form>
    </div>
  );
}
