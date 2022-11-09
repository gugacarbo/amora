import axios from "axios";

const api = axios.create({
  // baseURL: "https://www.digitalscudero.com.br/amora/api",
  // baseURL: "http://localhost/api",
  baseURL: "http://192.168.16.100/api",
});

export default api;
