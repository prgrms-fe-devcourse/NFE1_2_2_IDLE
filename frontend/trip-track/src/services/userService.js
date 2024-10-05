import api from '../utils/api'; // API 요청을 처리하는 api 인스턴스를 가져옴

/**
 * 사용자 ID를 기반으로 사용자 정보를 가져오는 함수
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Object>} - 사용자 정보 객체 반환
 */
export const getUserDetail = async (userId) => {
  try {
    // 사용자 ID를 기반으로 API 호출을 통해 사용자 정보를 가져옴
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user details for ID: ${userId}`, error.message);
    throw error;
  }
};