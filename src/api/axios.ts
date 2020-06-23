import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gorest.co.in",
  headers: { "Bearer: ": `${process.env.REACT_APP_API_KEY}` },
});

export default apiClient;
