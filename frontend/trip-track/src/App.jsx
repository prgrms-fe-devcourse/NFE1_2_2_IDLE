import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Header from "./components/Common/Header";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import EditProfilePage from "./pages/EditProfilePage";
import SearchResultsPage from './pages/SearchResultsPage';
// import PostDetailPage from './pages/PostDetailPage'; // 상세 페이지 컴포넌트 추가
import SearchUserResultsPage from './pages/SearchUserResultsPage';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        {/* Header를 모든 페이지에 포함 */}
        <Header />
        {/* 라우트 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/edit-profile' element={<EditProfilePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/search-users" element={<SearchUserResultsPage />} />
          {/* 다른 라우트들 */}
          {/* <Route path="/posts/:postId" element={<PostDetailPage />} /> 상세 페이지 경로 추가 */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;