import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import YourPosts from './components/YourPosts';
import CreatePost from './components/CreatePost';
import BlogPost from './components/BlogPost';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

function App() {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleInputChange = (value) => {
    setQuery(value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/blogs/search?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error('Failed to search blogs');
      }
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <Router>
      <AppContent
        query={query}
        blogs={blogs}
        handleInputChange={handleInputChange}
        fetchBlogs={fetchBlogs}
      />
    </Router>
  );
}

function AppContent({ query, blogs, handleInputChange, fetchBlogs }) {
  const currentLocation = useLocation(); // Renamed from `location` to `currentLocation`

  return (
    <div className="app-container">
      {/* Conditionally render the Navbar */}
      {currentLocation.pathname !== '/' && currentLocation.pathname !== '/home' && <Navbar />}
      
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/home"
            element={<Home blogs={blogs} query={query} handleInputChange={handleInputChange} />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/YourPosts" element={<YourPosts />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/CreatePost/:id" element={<CreatePost />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
