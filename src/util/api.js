import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost/api",
    baseURL: "https://www.digitalscudero.com.br/amora/api",
});

export default api;