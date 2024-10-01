import './NotificationItem.css'; // 스타일링

const NotificationItem = ({ notification, deleteMode, isSelected, onSelect, onDeselect }) => {
    const { id, user, message, checked, profileImage } = notification;

    const handleCheckBoxChange = (e) => {
        if (e.target.checked) {
            onSelect(id);
        } else {
            onDeselect(id);
        }
    };

    return (
        <div className={`notification-item ${checked ? '' : 'unread'}`}>
            <img src={profileImage} alt={`${user} profile`} className="profile-image" />
            <div className="notification-content">
                <span className="user-name">{user}</span>
                <p>{message}</p>
            </div>
            {deleteMode && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckBoxChange}
                    className="delete-checkbox"
                />
            )}
        </div>
    );
};

export default NotificationItem;
