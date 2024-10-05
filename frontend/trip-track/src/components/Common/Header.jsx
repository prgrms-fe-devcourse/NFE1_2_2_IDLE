import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button'; // Button 컴포넌트 임포트
import './Header.css';  // 스타일 정의
import logo from "../../assets/logo.png"; // 로고 이미지 파일 경로
import notificationIcon from '../../assets/notification.png';  // 알림 아이콘 이미지 파일 경로
import profileIcon from '../../assets/profileIcon.png'; // 프로필 아이콘 이미지 파일 경로

const Header = () => {
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 SignIn 페이지로 이동
  const handleSignInClick = () => {
    navigate('/signin');
  };

  // 로그아웃 버튼 클릭 시 (로그아웃 로직)
  const handleSignOutClick = () => {
    console.log('Sign Out Clicked');
  };

  return (
    <header className="header">
      {/* 로고 및 사이트 이름 */}
      <div className="header-left">
        <img src={logo} alt="Trip Track Logo" className="logo" />
        <span className="site-name">Trip Track</span>
      </div>

      {/* 헤더 오른쪽 영역 */}
      <div className="header-right">
        {/* 알림 아이콘 */}
        <img src={notificationIcon} alt="Notifications" className="notification-icon" />
        {/* 프로필 아이콘 */}
        <img src={profileIcon} alt="User Profile" className="profile-icon" />
        {/* Create Post 버튼 */}
        <Button className="create-post-button" label="Create Post" />
        {/* Sign Out 버튼 */}
        <Button className="sign-out-button" label="Sign Out" onClick={handleSignOutClick} />
      </div>
    </header>
  );
};

export default Header;
