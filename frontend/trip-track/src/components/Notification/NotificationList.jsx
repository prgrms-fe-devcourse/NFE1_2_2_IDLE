import React, { useEffect, useState } from "react";
import {
  sendNotification,
  getNotifications,
  markNotificationsAsSeen,
} from "../../services/notificationService"
import { formatTimeAgo } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const NotificationList = ({ setShowModal }) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]); // 선택된 알림을 저장
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      const data = await getNotifications(token);
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    const token = localStorage.getItem("token");
    if (!notification.seen) {
      await markAsRead(notification._id, token); // 읽음 처리
      setNotifications((prev) =>
        prev.map((n) => (n._id === notification._id ? { ...n, seen: true } : n))
      );
    }
    if (notification.notificationType === "FOLLOW") {
      navigate(`/users/${notification.follow}`);
    } else if (
      notification.notificationType === "COMMENT" ||
      notification.notificationType === "LIKE"
    ) {
      navigate(`/posts/${notification.post}`);
    }
    setShowModal(false);
  };

  const handleCheckboxChange = (notificationId) => {
    if (selectedNotifications.includes(notificationId)) {
      setSelectedNotifications((prev) =>
        prev.filter((id) => id !== notificationId)
      );
    } else {
      setSelectedNotifications((prev) => [...prev, notificationId]);
    }
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    await deleteNotifications(selectedNotifications, token); // 선택된 알림 삭제
    setNotifications((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification._id)
      )
    );
    setSelectedNotifications([]); // 선택 초기화
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">알림 목록</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {notifications.length === 0 ? (
              <p>알림이 없습니다.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="notification-item"
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* 체크박스 추가 */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification._id)}
                    onChange={() => handleCheckboxChange(notification._id)}
                  />
                  {notification.notificationType === "FOLLOW" &&
                    `${notification.author.fullName}님이 팔로우했습니다.`}
                  {notification.notificationType === "LIKE" &&
                    `${notification.author.fullName}님이 ${notification.postTitle}에 좋아요를 눌렀습니다.`}
                  {notification.notificationType === "COMMENT" &&
                    `${notification.author.fullName}님이 ${notification.postTitle}에 댓글을 달았습니다.`}
                  <span style={{ float: "right" }}>
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="modal-footer">
            {/* 선택된 알림 삭제 버튼 */}
            <button
              className="btn btn-danger"
              onClick={handleDeleteSelected}
              disabled={selectedNotifications.length === 0}
            >
              선택된 알림 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
