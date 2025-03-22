import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRouteWigwam = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/verify_token`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            console.log("Token Valid")
          setIsAuthorized(true); // Authorized
        }
      } catch (error) {
        console.error('Authorization failed:', error);
        setIsAuthorized(false); // Unauthorized
        localStorage.removeItem('token');
      }
    };

    verifyAccess();
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteWigwam;
