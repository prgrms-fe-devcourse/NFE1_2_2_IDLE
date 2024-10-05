import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import SearchResultsPage from './pages/SearchResultsPage';
// import PostDetailPage from './pages/PostDetailPage'; // 상세 페이지 컴포넌트 추가

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<SearchResultsPage />} />
        {/* <Route path="/posts/:postId" element={<PostDetailPage />} /> 상세 페이지 경로 추가 */}
      </Routes>
    </RecoilRoot>
  );
};

export default App;