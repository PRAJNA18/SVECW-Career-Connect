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
          onChange={handleInputChange}
          value={query}
          placeholder="search using company name or year or Jobtype(Intern or Full Time) or multiple."
        />
      </div>
      <div className="links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/services" className="navbar-link">Services</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        <Link to="/CreatePost" className="navbar-link">Create Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
