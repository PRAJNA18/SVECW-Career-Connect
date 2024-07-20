import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
    }
    setShouldRedirect(true);
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  }
};

export default Logout;
