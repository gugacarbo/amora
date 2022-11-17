import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL+"",
  // baseURL: "http://localhost/api",
//   baseURL: "http://192.168.16.100/api",
});

export default api;
