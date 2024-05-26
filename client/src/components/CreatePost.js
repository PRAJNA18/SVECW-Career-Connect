import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [title, setTitle] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setStudentEmail(email);
    }
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
      title,
    };

    try {
      let response;
      if (id) {
        response = await fetch(`http://localhost:8080/api/blogs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
          credentials: 'include',
        });
      } else {
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
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <form onSubmit={createNewPost} className="max-w-4xl mx-auto">
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">{id ? 'Edit Post' : 'Create Post'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Student Name *"
          value={studentName}
          onChange={(ev) => setStudentName(ev.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid black' }} // Inline style for input
        />
        <input
          type="text"
          placeholder="Company Name *"
          value={companyName}
          onChange={(ev) => setCompanyName(ev.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid black' }} // Inline style for input
        />
        <input
          type="number"
          placeholder="Year *"
          value={year}
          onChange={(ev) => setYear(ev.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid black' }} // Inline style for input
        />
        <select
            value={jobType}
            onChange={(ev) => setJobType(ev.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid black',
              color: '#aaa', // Set color of placeholder text
            }}
          >
            <option value="" style={{ color: '#aaa' }}>Select Job Type *</option>
            <option value="internship">Internship</option>
            <option value="fulltime">Full Time</option>
          </select>
      </div>
    </div>
    <input
      type="text"
      placeholder="Summary *"
      value={summary}
      onChange={(ev) => setSummary(ev.target.value)}
      className="blog-input mb-6"
      required
      style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid black' }} // Inline style for input
    />
    <div className="content mb-6">
      <ReactQuill
        style={{
          width: "100%",
          fontSize: '1rem',
          border: '1px solid black'
        }}
        value={content}
        theme="snow"
        onChange={handleContentChange}
        modules={modules}
      />
    </div>
    <button type="submit" className="blog-button w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      {id ? 'Update Post' : 'Create Post'}
    </button>
  </form>
</div>


  );
}
