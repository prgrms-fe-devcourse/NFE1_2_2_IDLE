import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로로 PostDetailPage를 렌더링 */}
        <Route path="/" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
