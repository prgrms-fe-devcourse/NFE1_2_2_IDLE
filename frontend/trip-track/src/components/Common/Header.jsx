// import { Link } from "react-router-dom";
import './Header.css'

const Header = ({ onNotificationClick }) => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.png" alt="Trip Track Logo" className="logo-image" />
                <h1 className="logo-text">Trip Track</h1>
            </div>

            <div className="header-buttons">
                <button onClick={onNotificationClick} className="notification-button">
                    🔔
                </button>
                <img src="/profile.png" alt="Profile Placeholder" className="profile-image" />
                <button className="create-post-button">
                    Create Post
                </button>
                <button className="sign-out-button">
                    Sign Out
                </button>
            </div>
        </header>
    );
};

export default Header;
