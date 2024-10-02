import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7700/api", // 백엔드 서버의 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 저장된 JWT 토큰
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
