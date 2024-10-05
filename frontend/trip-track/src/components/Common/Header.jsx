import './Header.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // 로그인 여부 확인
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); // 로그아웃 처리
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <img src="/logo.png" alt="Logo" />
                <h1>Trip Track</h1>
            </div>
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <>
                        <button onClick={() => navigate('/notifications')}>🔔</button>
                        <button onClick={() => navigate('/profile')}>Profile</button>
                        <button onClick={() => navigate('/create-post')}>Create Post</button>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/sign-in')}>Sign In</button>
                        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
