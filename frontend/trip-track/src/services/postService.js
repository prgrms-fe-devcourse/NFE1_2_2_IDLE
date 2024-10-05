import api from '../utils/api';

// 전체 검색 요청 함수
export const searchAll = async (query) => {
  if (!query || query.trim() === '') {
    console.warn('검색어가 비어있습니다. 올바른 검색어를 입력해주세요.');
    return []; // 빈 검색어일 경우 빈 배열 반환
  }

  try {
    // 검색어를 인코딩하여 URL에 사용할 수 있도록 변환
    const encodedQuery = encodeURIComponent(query);
    const response = await api.get(`/search/all/${encodedQuery}`);
    return response.data;
  } catch (error) {
    console.error('Failed to search:', error.message);
    return [];
  }
};


const CHANNEL_ID = '66ff3aae51e9a379d07c0b79'; // 임시 채널 ID. 추후 팀원들과 협의하여 채널 생성 후 이 값을 변경해야 합니다.

// 특정 채널의 포스트 목록 조회
export const getChannelPosts = async (channelId = CHANNEL_ID, offset = 0, limit = 10) => {
  try {
    const response = await api.get(`/posts/channel/${channelId}`, { params: { offset, limit } });
    return response.data;
  } catch (error) {
    console.error('Failed to get channel posts:', error.message);
    throw error;
  }
};

// 특정 사용자의 포스트 목록 조회
export const getUserPosts = async (userId, offset = 0, limit = 10) => {
  try {
    const response = await api.get(`/posts/author/${userId}`, { params: { offset, limit } });
    return response.data;
  } catch (error) {
    console.error('Failed to get user posts:', error.message);
    throw error;
  }
};

// 전체 사용자 목록 조회
export const getUsers = async () => {
  try {
    const response = await api.get('/users/get-users');
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error.message);
    throw error;
  }
};

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

// 특정 포스트 상세 조회
export const getPostDetail = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get post detail:', error.message);
    throw error;
  }
};