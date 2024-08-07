import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
    // baseURL: "http://localhost:8080/",
    baseURL: "https://chatapp-api-onkn.onrender.com/",
    // baseUrl: "https://chat-app-api-sage.vercel.app/",
    withCredentials: true
});

export default instance;