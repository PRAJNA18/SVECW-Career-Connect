// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './components/Home'; 
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact'; 
import CreatePost from './components/CreatePost';
import BlogPost from './components/BlogPost';
import Blogs from './Data/Blogs';
import './App.css';

const App = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredBlogs = Blogs.filter(
    (Blog) => Blog.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  return (
    <Router>
      <div className="app-container">
        <Navbar query={query} handleInputChange={handleInputChange}/>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home blogs={filteredBlogs}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
