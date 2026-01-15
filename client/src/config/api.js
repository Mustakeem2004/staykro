/**
 * API Configuration
 * Automatically uses backend URL based on environment
 * - Development: ${API_BASE_URL}
 * - Production: VITE_API_URL environment variable or https://staykro-backend.onrender.com
 */

// const getApiUrl = () => {
//   // For development
//   if (import.meta.env.DEV) {
//     return "${API_BASE_URL}";
//   }

//   // For production - check environment variable first
//   if (import.meta.env.VITE_API_URL) {
//     return import.meta.env.VITE_API_URL;
//   }

//   // Fallback to Render backend
//   return "https://staykro-backend.onrender.com";
// };

const API_BASE_URL = "http://localhost:3000";
// const API_BASE_URL = "https://staykro-backend.onrender.com";


export default API_BASE_URL;
