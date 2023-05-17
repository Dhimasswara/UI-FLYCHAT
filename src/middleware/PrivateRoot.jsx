import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoot = ({ children }) => {
  const isLogin = localStorage.getItem('token');

  if (!isLogin || isLogin === null) {
    return <Navigate to="/login" replace="true" />;
  }

  return children;
};

export default PrivateRoot;