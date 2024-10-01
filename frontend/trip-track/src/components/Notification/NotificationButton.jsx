import { useState } from 'react';
import NotificationModal from './NotificationModal';
import './NotificationButton.css'; // 스타일링

const NotificationButton = ({ notifications = [] }) => {
    const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태
    const hasNewNotification = notifications.some(n => !n.checked); // 새로운 알림 여부

    const handleButtonClick = () => {
        setIsOpen(!isOpen); // 모달 열림 상태 토글
    };

    return (
        <div className="notification-button">
            {/* 알림 아이콘 */}
            <button onClick={handleButtonClick} className="notification-icon">
                🔔
                {hasNewNotification && <span className="notification-dot"></span>}
            </button>
            
            {/* 모달이 열려 있을 경우에만 렌더링 */}
            {isOpen && <NotificationModal notifications={notifications} onClose={handleButtonClick} />}
        </div>
    );
};

export default NotificationButton;
