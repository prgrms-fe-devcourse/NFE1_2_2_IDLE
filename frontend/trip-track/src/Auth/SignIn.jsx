import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../recoil/atom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kdt.frontend.5th.programmers.co.kr:5008/login",
        {
          email,
          password,
        }
      );
      // JWT 토큰 및 사용자 ID 저장
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id); // userId 저장
      setCurrentUser(response.data.user); // Recoil 상태에 사용자 정보 저장
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
