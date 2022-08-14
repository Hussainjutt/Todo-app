import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 20000,
  headers: {
    jwt_token: token,
  },
});
