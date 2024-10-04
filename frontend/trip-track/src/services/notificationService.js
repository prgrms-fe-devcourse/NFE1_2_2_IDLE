import axios from "axios";

const API_HOST = "https://kdt.frontend.5th.programmers.co.kr:5008";

// 알림 목록 가져오기
export const getNotifications = async (token) => {
  const response = await axios.get(`${API_HOST}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 알림 읽음 처리
export const markAsRead = async (notificationId, token) => {
  await axios.put(
    `${API_HOST}/notifications/seen`, // API 경로 수정
    { id: notificationId }, // 알림 ID 전달
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// 알림 삭제
export const deleteNotifications = async (notificationIds, token) => {
  await axios.delete(`${API_HOST}/notifications`, {
    data: { ids: notificationIds }, // 삭제할 알림 ID 목록
    headers: { Authorization: `Bearer ${token}` },
  });
};