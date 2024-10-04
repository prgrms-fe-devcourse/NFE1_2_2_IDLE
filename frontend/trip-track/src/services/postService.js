import axios from "axios";

const API_HOST = "https://kdt.frontend.5th.programmers.co.kr:5008";

// 포스트 생성
export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_HOST}/posts`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 특정 사용자의 포스트 목록 가져오기
export const getPostsByAuthor = async (authorId) => {
  const response = await axios.get(`${API_HOST}/posts/author/${authorId}`);
  return response.data;
};

// 포스트 수정하기
export const updatePost = async (postId, updatedData, token) => {
  const response = await axios.put(`${API_HOST}/posts/${postId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 포스트 삭제하기
export const deletePost = async (postId, token) => {
  const response = await axios.delete(`${API_HOST}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
