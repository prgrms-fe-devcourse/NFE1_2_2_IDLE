import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/post/:postId" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
