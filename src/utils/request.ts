import axios from "axios";

const request = axios.create({
  baseURL: "https://server.24hstore.live",
  timeout: 3000,
});

export default request;
