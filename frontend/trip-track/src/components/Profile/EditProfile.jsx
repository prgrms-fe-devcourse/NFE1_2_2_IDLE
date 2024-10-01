import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css'; // 스타일 파일
import { useNavigate } from 'react-router-dom';

// 기본 프로필 이미지 URL (예시)
const defaultProfileImage = 'https://via.placeholder.com/150';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 사용자 데이터 예시 (실제 사용 시 API 호출로 받아올 수 있습니다)
  const userData = {
    fullName: "홍길동",
    email: "honggildong@example.com",
    bio: "안녕하세요, 저는 홍길동입니다.",
  };

  // 컴포넌트가 처음 렌더링될 때 사용자 데이터를 상태에 설정
  useEffect(() => {
    setFullName(userData.fullName);
    setEmail(userData.email);
    setBio(userData.bio);
  }, []);

  // 계정 삭제 핸들러
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 계정을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:5000/api/delete-account');
        alert('계정이 성공적으로 삭제되었습니다.');
        navigate('/goodbye'); // 삭제 후 다른 페이지로 이동
      } catch (err) {
        console.error("계정 삭제 중 오류 발생:", err);
        setError("계정 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 프로필 이미지 변경 핸들러
  const handleProfileImageChange = () => {
    const newImageUrl = prompt("새 프로필 이미지 URL을 입력하세요:", profileImage);
    if (newImageUrl) {
      setProfileImage(newImageUrl); // 새로운 이미지 URL로 업데이트
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.put('http://localhost:5000/api/update-profile', {
        fullName,
        email,
        password, // 비밀번호가 입력된 경우만 포함
        bio,
        profileImage,
      });
      setMessage('정보가 성공적으로 업데이트되었습니다.');
      navigate('/profile');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('정보 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="edit-my-page">
      <div className="profile-container">
        <div className="left-container">
          <div className="profile-image-container">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <button className="edit-button" onClick={handleProfileImageChange}>
              Edit
            </button>
          </div>
          <div className="profile-bio">
            <label>Introduction</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개"
              rows="4"
            />
          </div>
        </div>
        <div className="profile-details">
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <p>프로필 수정</p>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                readOnly
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
              />
            </div>
            <button className="save-button" type="submit">Save</button>
          </form>
          <button className="delete-account-button" onClick={handleDeleteAccount}>
            Delete Account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
