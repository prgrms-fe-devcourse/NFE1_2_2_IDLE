// authService.js

import axiosInstance from "./axiosInstance"; // axiosInstance로 변경

export const getUsers = async () => {
  const response = await axiosInstance.get("/users/get-users");
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

// 팔로우 API
export const followUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/follow/create", {
      userId: userId, // 서버에 userId 전달
    });
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// 언팔로우 API
export const unfollowUser = async (followId) => {
  try {
    console.log("Sending unfollow request with followId:", followId); // 디버깅 로그 추가
    const response = await axiosInstance.delete("/follow/delete", {
      data: { id: followId }, // API 명세에 맞게 'id'로 전달
    });
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};
