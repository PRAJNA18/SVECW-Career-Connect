import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AuthorProfile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/profile/details/${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    return () => {
      setUser(null);
    };
  }, [email]);

  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Author Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-lg text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <p className="text-lg text-gray-700">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </label>
          <p className="text-lg text-gray-700">{user.phone || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Year:
          </label>
          <p className="text-lg text-gray-700">{user.year || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            LinkedIn:
          </label>
          <p className="text-lg text-gray-700">{user.linkedin || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            GitHub:
          </label>
          <p className="text-lg text-gray-700">{user.github || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
