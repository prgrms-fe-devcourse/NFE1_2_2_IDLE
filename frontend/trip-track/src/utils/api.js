import axios from 'axios';

// API의 기본 URL 설정
const API_HOST = 'https://kdt.frontend.5th.programmers.co.kr:5008';

const api = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 함수
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data; // { user, token }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 회원가입 함수
export const signUp = async (email, fullName, password) => {
  try {
    const response = await api.post('/signup', { email, fullName, password });
    return response.data; // { user, token }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 사용자 정보 변경 함수
export const updateUser = async (token, fullName, username) => {
  try {
    const response = await api.put('/settings/update-user', { fullName, username }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // User 정보 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 비밀번호 변경 함수
export const updatePassword = async (token, newPassword) => {
  try {
    const response = await api.put('/settings/update-password', { password: newPassword }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // 성공 메시지 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 프로필 이미지 업로드 함수
export const uploadProfileImage = async (token, imageFile) => {
  const formData = new FormData();
  formData.append('isCover', false);
  formData.append('image', imageFile);

  try {
    const response = await api.post('/users/upload-photo', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // User 정보 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 커버 이미지 업로드 함수
export const uploadCoverImage = async (token, imageFile) => {
  const formData = new FormData();
  formData.append('isCover', true);
  formData.append('image', imageFile);

  try {
    const response = await api.post('/users/upload-photo', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // User 정보 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 사용자 정보 가져오기 함수
export const getUser = async (token, userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // User 정보 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 사용자 목록 가져오기 함수
export const getUsers = async () => {
  try {
    const response = await api.get('/users/get-users');
    return response.data; // User 배열 반환
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;
