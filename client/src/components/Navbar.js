import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isUserLoggedIn = !!localStorage.getItem("userEmail");

  // Function to check if the path is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 shadow-md">
      <div className="flex items-center flex-shrink-0 text-gray-900 mr-6">
        <span className="font-semibold text-xl tracking-tight">SVECW Career Connect</span>
      </div>
      <div className="block lg:hidden">
        <button 
          className="flex items-center px-3 py-2 border rounded text-gray-900 border-gray-400 hover:text-gray-600 hover:border-gray-600"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:justify-between lg:w-auto`}>
        <div className="lg:flex lg:items-center lg:justify-end w-full lg:w-auto">
          <Link
            to="/"
            className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
              isActive('/') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/About"
            className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
              isActive('/About') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            About
          </Link>
          <Link
            to="/YourPosts"
            className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
              isActive('/YourPosts') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            Your Posts
          </Link>
          <Link
            to="/CreatePost"
            className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
              isActive('/CreatePost') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            Create Post
          </Link>
          <Link
            to="/Profile"
            className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
              isActive('/Profile') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            Profile
          </Link>
          {isUserLoggedIn ? (
            <Link
              to="/Logout"
              className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
                isActive('/Logout') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
              }`}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/SignIn"
              className={`block mt-4 lg:inline-block lg:mt-0 p-2 rounded mr-4 transition-all duration-300 ${
                isActive('/SignIn') ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/50' : 'text-gray-900 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
