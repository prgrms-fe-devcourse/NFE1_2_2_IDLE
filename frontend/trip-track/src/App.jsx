import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header"; // 추가
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import EditProfilePage from "./pages/EditProfilePage";
// 다른 페이지들 import

function App() {
  return (
    <Router>
      <Header />
      {/* 라우트 설정 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/edit-profile' element={<EditProfilePage />} />
        {/* 다른 라우트들 */}
      </Routes>
    </Router>
  );
}

export default App;
