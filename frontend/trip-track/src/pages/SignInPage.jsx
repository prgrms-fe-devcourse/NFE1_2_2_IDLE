import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";
import Logo from "../assets/images/logo.png";
import "./SignInPage.css";

const SignIn = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 변수
  const [password, setPassword] = useState(""); // 비밀번호 상태 변수
  const [error, setError] = useState(""); // 에러 메시지 상태 변수

  const navigate = useNavigate();

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 입력값 검증
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 로그인 요청
      const response = await signIn({ email, password });
      const { user, token } = response.data;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", token);
      console.log(user.fullName, " 님의 토큰 : ", token);

      // 로그인 성공 후 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="form-container">
        <h3>로그인</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
          <p>Dont't have account? <Link to="/signup" >Sign up!</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
