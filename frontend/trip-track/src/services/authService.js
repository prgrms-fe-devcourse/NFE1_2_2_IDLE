import api from '../utils/api';

// 회원가입 요청 함수
export const signUp = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response; // 서버 응답 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러 처리
  }
};

// 로그인 요청 함수
export const signIn = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);

    return user; // 로그인 성공 시 사용자 정보 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러 처리
  }
};

// 로그아웃 함수
export const signOut = () => {
  // 로컬 스토리지에서 토큰 제거
  localStorage.removeItem('token');
  console.log('로그아웃 완료');
};
