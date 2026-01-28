// src/utils/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Get user from localStorage
export const getUser = () => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin-login';
};

// Make authenticated API request
export const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    // Add authorization header if token exists
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        // Handle token expiration
        if (response.status === 401 || response.status === 403) {
            logout();
            return null;
        }

        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// Convenience methods
export const api = {
    get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),

    post: (endpoint, data) => apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    put: (endpoint, data) => apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),

    patch: (endpoint, data) => apiRequest(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
};