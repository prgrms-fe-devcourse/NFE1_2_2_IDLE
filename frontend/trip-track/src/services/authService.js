import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // 서버 API 주소

// 회원가입 요청 함수
const signUp = (formData) => {
  return axios.post(`${API_URL}/signup`, formData);
};

// 중복 체크 요청 함수
const checkDuplicate = (type, value) => {
  return axios.get(`${API_URL}/check-duplicate`, {
    params: { type, value }
  });
};

// 이메일 인증 요청 함수
const sendEmailVerification = (email) => {
  return axios.post(`${API_URL}/send-verification-email`, { email });
};

export default {
  signUp,
  checkDuplicate,
  sendEmailVerification
};