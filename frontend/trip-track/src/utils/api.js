import axios from 'axios';

// Axios 기본 설정
const api = axios.create({
  baseURL: 'https://kdt.frontend.5th.programmers.co.kr:5008',  // API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 토큰 설정 함수
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// 로그인 및 회원가입과 같은 토큰이 필요한 API 요청 이후 사용자가 인증될 때 호출
export const getAuthUser = async () => {
  try {
    const response = await api.get('/auth-user');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch authenticated user:', error.message);
    return null;
  }
};

export default api;