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
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">{blog.title || 'Untitled'}</h1>
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">By {blog.studentName}</p>
          <p className="text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogPost;
