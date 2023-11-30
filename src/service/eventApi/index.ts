import axios from "axios";

const eventApi = axios.create({
  baseURL: "https://localhost:8082",
});

export default eventApi;
