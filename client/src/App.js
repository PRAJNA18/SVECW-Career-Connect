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
import AuthorProfile from './components/AuthorProfile';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Logout from './components/Logout';

function App() {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  const fetchBlogs = async (newPage = 1) => {
    try {
      const response = await fetch(`http://localhost:8080/api/blogs?page=${newPage}&limit=6`);
      if (response.ok) {
        const data = await response.json();
        const maxPagesToShow = 5;
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);

        let startPage, endPage;
        if (newPage > currentPage && newPage % maxPagesToShow === 1) {
          startPage = newPage;
          endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
          const pageNums = [];
          for (let i = startPage; i <= endPage; i++) {
            pageNums.push(i);
          }
          setPageNumbers(pageNums);
        } else if (newPage < currentPage && newPage % maxPagesToShow === 0) {
          startPage = Math.max(newPage - maxPagesToShow + 1, 1);
          endPage = newPage;
          const pageNums = [];
          for (let i = startPage; i <= endPage; i++) {
            pageNums.push(i);
          }
          setPageNumbers(pageNums);
        } else {
          return;
        }

        setCurrentPage(newPage);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

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
    if (query) {
      handleSearch();
    } else {
      fetchBlogs(currentPage);
    }
  }, [query]);

  const handleNewPost = () => {
    fetchBlogs(currentPage);
  };

  return (
    <Router>
      <AppContent
        query={query}
        blogs={blogs}
        handleInputChange={handleInputChange}
        fetchBlogs={fetchBlogs}
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        handleNewPost={handleNewPost}
      />
    </Router>
  );
}

function AppContent({ query, blogs, handleInputChange, currentPage, totalPages, pageNumbers, fetchBlogs, handleNewPost }) {
  const currentLocation = useLocation();

  const showNavbar = !(
      currentLocation.pathname === '/SignIn' ||
      currentLocation.pathname === '/login' ||
      currentLocation.pathname === '/register' ||
      currentLocation.pathname === '/forgot-password' ||
      currentLocation.pathname.startsWith('/reset-password')
  );

  return (
      <div className="app-container">
          {showNavbar && <Navbar />}
          <div className="content">
              <Routes>
                  <Route path="/SignIn" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route
                      path="/"
                      element={<Home
                          blogs={blogs}
                          query={query}
                          handleInputChange={handleInputChange}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          fetchBlogs={fetchBlogs}
                          pageNumbers={pageNumbers}
                      />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/yourposts" element={<YourPosts />} />
                  <Route
                    path="/createpost"
                    element={<CreatePost onNewPost={handleNewPost} />}
                  />
                  <Route path="/createpost/:id" element={<CreatePost onNewPost={handleNewPost} />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:email" element={<AuthorProfile />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
                  <Route path="/Logout" element={<Logout />} />
              </Routes>
          </div>
      </div>
  );
}

export default App;
