import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/authService";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn(credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <h3>로그인</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {/* 비밀번호 입력 필드 */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;