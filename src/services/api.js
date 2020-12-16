import axios from "axios";

const api = axios.create({
    baseURL: "https://umic-api.herokuapp.com/",
})

export default api;