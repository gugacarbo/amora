import axios from "axios";

const api = axios.create({
    baseURL: "https://www.digitalscudero.com.br/amora/api",
    // baseURL: "http://localhost/api",
});

export default api;