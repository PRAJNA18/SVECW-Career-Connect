import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Your Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <li key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <Link to={`/blog/${blog._id}`} className="block hover:bg-gray-100 transition duration-300 p-4 rounded-lg">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-center text-red-500">{blog.title || 'Untitled'}</h3>
                <h4 className="text-sm text-gray-600 mb-2 shadow-md rounded-lg p-2 bg-gray-100">
                  <span className="text-gray-700">Date: </span>{new Date(blog.createdAt).toLocaleDateString()}
                </h4>
                <p className="mt-2 text-gray-700">{blog.summary}</p>
              </Link>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourPosts;
