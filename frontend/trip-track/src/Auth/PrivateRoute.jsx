import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atom";

const PrivateRoute = ({ children }) => {
  const currentUser = useRecoilValue(currentUserState);

  // 인증된 사용자가 없으면 로그인 페이지로 리디렉션
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;