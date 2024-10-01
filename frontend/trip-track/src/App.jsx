import React from 'react';
import EditProfilePage from './pages/EditProfilePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit-profile' element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
