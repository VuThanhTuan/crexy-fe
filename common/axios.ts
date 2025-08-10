import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or cookies if you use cookies)
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized error
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login or clear token
      // localStorage.removeItem("jwt_token");
      // window.location.href = "/login";
    }
    // You can handle other status codes here
    return Promise.reject(
      error.response?.data?.message || error.message || "An error occurred"
    );
  }
);

export default api;
