// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleInputChange, query }) => {
  return (
    <nav className="navbar">
      <div className="logo">SVECW Career Connect</div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          value={query}
          placeholder="Search by company name, year, Jobtype (Intern or Full Time), or multiple"
        />
      </div>
      <div className="links">
        <Link to="/Home" className="navbar-link">Home</Link>
        <Link to="/About" className="navbar-link">About</Link>
        <Link to="/YourPosts" className="navbar-link">Your Posts</Link>
        <Link to="/CreatePost" className="navbar-link">Create Post</Link>
        <Link to="/Profile" className="navbar-link">Profile</Link>
      </div>
    </nav>
  );
};


export default Navbar;
