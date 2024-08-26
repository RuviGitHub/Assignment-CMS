import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the requested component
  return children;
};

export default PrivateRoute;
