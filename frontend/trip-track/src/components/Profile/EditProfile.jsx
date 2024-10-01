import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';
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

    // 비밀번호 일치 여부 확인
    if (password && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 사용자 정보 업데이트 요청
      const response = await axios.put('http://localhost:5000/api/update-profile', {
        fullName,
        email, // 이메일은 읽기 전용이므로 그대로 사용
        password, // 비밀번호가 입력된 경우만 포함
        bio,
        profileImage,
      });
      setMessage('정보가 성공적으로 업데이트되었습니다.');
     
      navigate('/profile'); // 프로필 페이지로 이동
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
      <h3>내 정보 수정</h3>
      <div className="profile-container">
        <div className="left-container">
            <div className="profile-image">
                <img src={profileImage} alt="Profile" onClick={handleProfileImageChange} />
                <p>프로필 이미지 클릭하여 변경</p>
            </div>
            <div className='profile-bio'>
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
                readOnly // 이메일 입력 필드를 읽기 전용으로 설정
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
            <button type="submit">Save</button>
          </form>
          <p>Delete Account?</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
