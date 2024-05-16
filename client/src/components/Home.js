import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ blogs }) => {
  return (
    <div className="blog-list">
      <div className='intro'>
        <h1>Welcome to SVECW Career Connect</h1>
        <p>Explore the latest blogs and discover valuable career insights.</p>
      </div>
      <h2>Latest Blogs</h2>
      <ul className="blog-items">
        {blogs.map((blog) => (
          <li key={blog._id} className={`blog-item`}>
            <Link to={`/blog/${blog._id}`}>
              <h3>{blog.title || 'Untitled'}</h3>
              <h4>{blog.createdAt}</h4>
            </Link>
            <p>{blog.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
