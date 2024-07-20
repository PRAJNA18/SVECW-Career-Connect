import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = ({ onNewPost }) => {
  const { id } = useParams();
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [year, setYear] = useState("");
  const [jobType, setJobType] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    setStudentName(name);
    setStudentEmail(email);
  }, []);

  useEffect(() => {
    if (companyName && year && jobType) {
      const generatedTitle = `${companyName} ${year} ${jobType}`;
      setTitle(generatedTitle);
    }
  }, [companyName, year, jobType]);

  useEffect(() => {
    if (id) {
      fetchPostData();
    }
  }, [id]);

  async function fetchPostData() {
    try {
      const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName);
        setYear(data.year);
        setJobType(data.jobType);
        setSummary(data.summary);
        setContent(data.content);
        setTitle(data.title);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }

  async function createNewPost(ev) {
    ev.preventDefault();
    if (!studentEmail || !studentName) {
      alert("Please login to create a post");
      setRedirect(true);
    }

    if (!companyName || !year || !jobType || !summary || !content) {
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
      title,
    };

    try {
      let response;
      if (id) {
        response = await fetch(`http://localhost:8080/api/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: "include",
        });
      } else {
        response = await fetch("http://localhost:8080/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: "include",
        });
      }

      if (response.ok) {
        if (onNewPost) {
          onNewPost();
        }
        setRedirect(true);
      } else {
        console.error("Failed to create or update post");
      }
    } catch (error) {
      console.error("Error creating or updating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  const handleContentChange = (htmlValue) => {
    setContent(htmlValue);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-center">Sign into your account to create a post</h1>
      <form onSubmit={createNewPost} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
            {id ? "Edit Post" : "Create Post"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Company Name *"
              value={companyName}
              required
              onChange={(ev) => setCompanyName(ev.target.value)}
              className="form-input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Year *"
              value={year}
              required
              onChange={(ev) => setYear(ev.target.value)}
              className="form-input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={jobType}
              onChange={(ev) => setJobType(ev.target.value)}
              className="form-input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Job Type *</option>
              <option value="internship">Internship</option>
              <option value="fulltime">Full Time</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          placeholder="Summary *"
          value={summary}
          required
          onChange={(ev) => setSummary(ev.target.value)}
          className="form-input border border-gray-300 rounded-lg p-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="content mb-6">
          <ReactQuill
            style={{
              width: "100%",
              fontSize: "1rem",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
            value={content}
            theme="snow"
            required
            onChange={handleContentChange}
            modules={modules}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

