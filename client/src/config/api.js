/**
 * API Configuration
 * Automatically uses backend URL based on environment
 * - Development: http://localhost:3000
 * - Production: VITE_API_URL environment variable or https://travelwindow-api.onrender.com
 */

const getApiUrl = () => {
  // For development
  if (import.meta.env.DEV) {
    return "http://localhost:3000";
  }

  // For production - check environment variable first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback to Render backend
  return "https://travelwindow-api.onrender.com";
};

const API_BASE_URL = getApiUrl();

export default API_BASE_URL;
