// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },
  login: async (credentials) => {
    return apiRequest('/auth/login', 'POST', credentials);
  },
};

// Events API
export const eventsAPI = {
  getAllEvents: (token) => apiRequest('/events', 'GET', null, token),
  getEventById: (id, token) => apiRequest(`/events/${id}`, 'GET', null, token),
  createEvent: (eventData, token) => apiRequest('/events', 'POST', eventData, token),
  updateEvent: (id, eventData, token) => apiRequest(`/events/${id}`, 'PUT', eventData, token),
  deleteEvent: (id, token) => apiRequest(`/events/${id}`, 'DELETE', null, token),
  registerForEvent: (id, token) => apiRequest(`/events/${id}/register`, 'POST', null, token),
  unregisterFromEvent: (id, token) => apiRequest(`/events/${id}/unregister`, 'POST', null, token),
  getEventRegistrations: (id, token) => apiRequest(`/events/${id}/registrations`, 'GET', null, token),
};