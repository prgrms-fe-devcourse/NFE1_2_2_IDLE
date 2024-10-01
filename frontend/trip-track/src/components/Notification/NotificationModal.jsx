import { useState } from 'react';
import NotificationItem from './NotificationItem';
import './NotificationModal.css'; // 스타일링

const NotificationModal = ({ notifications, onClose }) => {
    const [deleteMode, setDeleteMode] = useState(false); // 삭제 모드 상태
    const [selectedNotifications, setSelectedNotifications] = useState([]); // 선택된 알림 목록

    const handleDeleteModeToggle = () => {
        setDeleteMode(!deleteMode);
        setSelectedNotifications([]); // 삭제 모드를 종료하면 선택 초기화
    };

    const handleSelectAll = () => {
        if (selectedNotifications.length === notifications.length) {
            setSelectedNotifications([]); // 모두 선택된 상태면 해제
        } else {
            setSelectedNotifications(notifications.map(n => n.id)); // 모든 알림 선택
        }
    };

    const handleDelete = () => {
        // 선택된 알림 삭제 로직 추가
        if (selectedNotifications.length > 0) {
            console.log('삭제할 알림: ', selectedNotifications);
            setDeleteMode(false);
        }
    };

    return (
        <div className="notification-modal">
            <button onClick={onClose} className="close-button">X</button>
            {notifications.length === 0 ? (
                <p className="no-notifications">알림이 없습니다.</p>
            ) : (
                <>
                    <div className="modal-header">
                        <button onClick={handleSelectAll}>전체 선택</button>
                        <button onClick={handleDeleteModeToggle} className="delete-mode-button">
                            {deleteMode ? '취소' : '휴지통'}
                        </button>
                    </div>
                    <div className="notification-list">
                        {notifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                deleteMode={deleteMode}
                                isSelected={selectedNotifications.includes(notification.id)}
                                onSelect={() => setSelectedNotifications([...selectedNotifications, notification.id])}
                                onDeselect={() => setSelectedNotifications(
                                    selectedNotifications.filter(id => id !== notification.id)
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationModal;
