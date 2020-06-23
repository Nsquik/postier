import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://gorest.co.in",
  headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
});

export default apiClient;
