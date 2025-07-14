// src/contexts/AuthContext.js
import { createContext, useContext, useState,  useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

//  Initialize user on mount
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         const response = await axios.get('/api/auth/me', {
  //           headers: { Authorization: `Bearer ${token}` }
  //         });
  //         setCurrentUser(response.data);
  //       }
  //     } catch (err) {
  //       console.error("Auth initialization error:", err);
  //       localStorage.removeItem('token');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   initializeAuth();
  // }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      navigate('/');
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

const register = useCallback(async (userData) => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      userData, // Send the complete object
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const { token, ...user } = response.data;
    localStorage.setItem('token', token);
    setCurrentUser(user);
    navigate('/');
    return user;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Registration failed';
    setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
}, [navigate]);

  const logout = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } finally {
      localStorage.removeItem('token');
      setCurrentUser(null);
      navigate('/login');
    }
  }, [navigate]);

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};