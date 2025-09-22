import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://sihgangorti-backend.onrender.com/api",
  withCredentials: true, 
  timeout: 15000,
});

export default API;
