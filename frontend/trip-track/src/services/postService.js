import axios from "axios";

const API_HOST = "https://kdt.frontend.5th.programmers.co.kr:5008";

// 특정 채널의 포스트 목록 가져오기
export const getPostsByChannel = async (channelId, offset = 0, limit = 10) => {
  const response = await axios.get(`${API_HOST}/posts/channel/${channelId}`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

// 특정 사용자의 포스트 목록 가져오기
export const getPostsByAuthor = async (authorId, offset = 0, limit = 10) => {
  const response = await axios.get(`${API_HOST}/posts/author/${authorId}`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

// 포스트 생성
export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_HOST}/posts/create`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 특정 포스트 상세 보기
export const getPostById = async (postId) => {
  const response = await axios.get(`${API_HOST}/posts/${postId}`);
  return response.data;
};

// 내가 작성한 포스트 수정하기
export const updatePost = async (postId, updatedData, token) => {
  const response = await axios.put(`${API_HOST}/posts/update`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 내가 작성한 포스트 삭제하기
export const deletePost = async (postId, token) => {
  const response = await axios.delete(`${API_HOST}/posts/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: postId,
    },
  });
  return response.data;
};
