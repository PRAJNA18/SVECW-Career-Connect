import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          console.error('Failed to fetch blog');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlogById();
    return () => {
      setBlog(null);
    };
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post">
      <h1>{blog.title || 'Untitled'}</h1>
      <p className="author">By {blog.author}</p>
      <p className="date">{new Date(blog.createdAt).toDateString()}</p>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogPost;

