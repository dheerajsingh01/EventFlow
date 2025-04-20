// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('eventflow_user');
    const storedToken = localStorage.getItem('eventflow_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await authAPI.login({ email, password });
      
      localStorage.setItem('eventflow_token', token);
      localStorage.setItem('eventflow_user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (full_name, email, password, role) => {
    try {
      const { token, user: userData } = await authAPI.register({ 
        full_name, 
        email, 
        password, 
        role 
      });
      
      localStorage.setItem('eventflow_token', token);
      localStorage.setItem('eventflow_user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('eventflow_token');
    localStorage.removeItem('eventflow_user');
    setUser(null);
    navigate('/');
  };

  const getToken = () => {
    return localStorage.getItem('eventflow_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);