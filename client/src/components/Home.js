import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({blogs}) => {

  return (
    <div className="blog-list">
      <div className='intro'>
        <h1>Welcome to SVECW Career Connect</h1>
        <p>Explore the latest blogs and discover valuable career insights.</p>
      </div>
      <h2>Latest Blogs</h2>
      <ul className="blog-items">
        {blogs.map((blog) => (
          <li key={blog.id} className={`blog-item`}>
            <Link to={`/blog/${blog.id}`}>
              <h3>{blog.title}</h3>
              <p>{blog.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
