import axios from "axios";

const flightApi = axios.create({
  baseURL: "https://localhost:8081",
});

export default flightApi;
