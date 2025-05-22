// Exemple dans axios config
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // <- adapte selon ton backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
