import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [showModal, setShowModal] = useState(false);
  
// 사용자 정보를 로드하는 useEffect
useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // localStorage에서 userId 가져오기
  if (token && userId) {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5008/users/${userId}`, // userId 사용
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData); // 사용자 정보 Recoil에 저장
        } else {
          localStorage.removeItem("token"); // 잘못된 토큰인 경우 삭제
          localStorage.removeItem("userId"); // userId도 삭제
          setCurrentUser(null); // 로그아웃 상태로 전환
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }
}, [setCurrentUser]);


  const headerHeight = (80 / window.innerHeight) * 100;
  const buttonStyle = {
    width: "46px",
    height: "46px",
  };

const profileImageStyle = {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    marginRight: "16px",
    cursor: "pointer",
  };
  return (
    <header
    className="navbar bg-body-light"
    style={{
      width: "100vw",
      height: `${headerHeight}vh`,
      boxShadow: "0 4px 10px rgba(0, 102, 255, 0.25)",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      boxSizing: "border-box",
    }}
  >
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="Logo"
          width="46"
          height="46"
          className="d-inline-block align-text-top"
          style={{ marginRight: "10px" }}
        />
        <span style={{ fontSize: "32px", fontWeight: 700 }}>Trip Track</span>
      </a>

      <div className="d-flex align-items-center">
        {currentUser ? (
          <>
            <div className="position-relative me-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                // data-bs-toggle="modal"
                // data-bs-target="#notificationModal"
                onClick={handleNotificationClick}
                style={buttonStyle}
              >
                <IoMdNotificationsOutline size={25} />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showModal && <NotificationModal setShowModal={setShowModal} />}
            </div>

            <img
              src={
                currentUser.profileImage ||
                `${import.meta.env.BASE_URL}images/defaultProfile.png`
              }
              alt="Profile"
              style={profileImageStyle}
              onClick={() => navigate(`/user/${currentUser._id}`)}
            />

            <button type="button" className="btn btn-outline-primary me-2">
              Create Post
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId"); // userId도 제거
                setCurrentUser(null); // 로그아웃 시 상태 업데이트
                window.location.reload(); // 페이지 새로 고침
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  </header>
  );
};

export default Header;