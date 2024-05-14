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
    <div>
      <h2>Profile</h2>
      <p>Email: {email}</p>
    </div>
  );
};

export default Profile;

