import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://gorest.co.in",
  headers: {
    Authorization: `Bearer ${
      process.env.REACT_APP_API_KEY || "a62c1adb350eef96e52de7b870dfce6accac00f541b0d0c680d03820862408d8"
    }`,
  },
});

export default apiClient;
