import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Create and export the context in one step
export const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Remove /api/auth from the path since your backend uses /api/auth prefix
      const { data } = await api.get('api/auth/me'); // Changed from '/api/auth/me'
      setUser(data.user);
    }
  } catch (err) {
    console.error('Auth check failed:', err);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  } finally {
    setLoading(false);
  }
};
    
    checkAuth();
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}