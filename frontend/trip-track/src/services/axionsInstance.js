import axios from "axios";

const API_HOST = "https://kdt.frontend.5th.programmers.co.kr:5008";

const axiosInstance = axios.create({
  baseURL: API_HOST,
});

// 요청마다 자동으로 토큰을 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;