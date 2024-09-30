import axios from 'axios';

// 기본 Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://kdt.frontend.5th.programmers.co.kr:5008', // API 서버의 기본 URL
  headers: {
    'Content-Type': 'application/json',
    // 필요한 경우 인증 토큰 등을 추가 가능
  },
});

// 요청 인터셉터 (예: JWT 토큰 자동 추가)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 저장된 JWT 토큰을 가져옴
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;