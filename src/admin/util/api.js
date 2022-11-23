import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/admin",
  // baseURL: "http://localhost/api/admin",
});

export default api;
