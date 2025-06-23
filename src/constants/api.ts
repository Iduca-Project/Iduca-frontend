import axios from "axios";

export const BASE_URL = "http://localhost:8080/";
// export const BASE_URL = "";

export const api = axios.create({
    baseURL: BASE_URL
})