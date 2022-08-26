import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tonie-blog-site.herokuapp.com/api",
});
