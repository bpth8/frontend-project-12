import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  
  if (auth.loggedIn) {
    return children;
  }
  
  return <Navigate to="/login" />;
};

export default PrivateRoute;