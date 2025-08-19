import axios from "axios";
const client = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
export default client;
