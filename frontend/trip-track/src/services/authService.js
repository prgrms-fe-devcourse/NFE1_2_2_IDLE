import axiosInstance from "./axionsInstance"; // axiosInstance로 변경

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
    const response = await axiosInstance.delete("/follow/delete", {
      data: { id: followId }, // DELETE 요청에 follow 객체의 _id 전달
    });
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};