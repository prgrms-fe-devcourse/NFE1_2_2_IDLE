import './App.css'
import { Routes, Route } from 'react-router-dom';
import PostDetailPage from './pages/PostDetailPage.jsx';
// import EditPostPage from './EditPostPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/post/:postId" element={<PostDetailPage />} />
        {/* <Route path="/edit-post/:postId" element={<EditPostPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
