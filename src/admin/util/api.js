import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/admin",
  // baseURL: "http://localhost/api/admin",
  //   baseURL: "http://192.168.16.100/api/admin",
});

export default api;
