import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import MusicUploadForm from '../components/MusicUploadForm.jsx';

const MusicUpload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    console.log('Checking auth...');
    console.log('Token from localStorage:', token);
    if (token) {
      console.log('Token found, setting authenticated to true');
      setIsAuthenticated(true);
    } else {
      console.log('No token found, keeping login form');
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Re-check auth when window regains focus
  useEffect(() => {
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <MusicUploadForm/>
      ) : (
        <LoginForm onLoginSuccess={checkAuth} />
      )}
    </div>
  );
};

export default MusicUpload;
