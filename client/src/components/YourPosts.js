import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const YourPosts = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/blogs/user/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch user posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [userEmail]);

  const handleEdit = (id) => {
    navigate(`/CreatePost/${id}`);
    console.log('Edit blog with ID:', id);
  };

  const handleDelete = async (id) => {
    // Display a confirmation dialog to the user
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
  
    // If the user confirms deletion, proceed with deletion
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/delete/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Remove the deleted post from the local state
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    } else {
      console.log('Deletion canceled by user');
    }
  };
  

  return (
    <div className="blog-list">
      <h2>Your Posts</h2>
      <ul className="blog-items">
        {blogs.map((blog) => (
          <li key={blog._id} className={`blog-item`}>
            <div>
              <Link to={`/blog/${blog._id}`}>
                <h3>{blog.title || 'Untitled'}</h3>
                <h4>{blog.createdAt}</h4>
              </Link>
              <p>{blog.summary}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(blog._id)}>Edit</button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourPosts;

