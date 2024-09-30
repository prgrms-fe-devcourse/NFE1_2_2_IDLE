import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from './authService'; // 인증 관련 API

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // 현재 로그인한 사용자 정보 가져오기
        setUser(currentUser);
      } catch (error) {
        setUser(null); // 로그인하지 않은 경우
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); //사용자 정보를 가져오는 함수 호출
  }, []);

  const value = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* 로딩이 끝난 후 컴포넌트 렌더링 */}
    </AuthContext.Provider>
  );
};