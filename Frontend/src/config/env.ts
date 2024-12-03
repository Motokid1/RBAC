// Environment configuration for the frontend application
// All environment variables must be prefixed with VITE_ to be exposed to the frontend

// API URL for backend communication
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Session timeout in milliseconds (4 minutes)
export const SESSION_TIMEOUT = parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '240000', 10);

// Validate required environment variables
const validateEnvVariables = () => {
  const required = ['VITE_API_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Run validation
validateEnvVariables();