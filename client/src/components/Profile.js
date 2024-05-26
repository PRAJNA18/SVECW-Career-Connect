import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [email, setEmail] = useState('');

  const getUserEmail = () => {
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Profile</h2>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default Profile;


