// src/App.jsx
import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home';
import SignIn from "./Auth/SignIn";
import NotFoundPage from './components/Common/NotFoundPage';
import UserProfilePage from "./pages/UserProfilePage";
import PrivateRoute from "./Auth/PrivateRoute";
import LoadUserFromLocalStorage from "./hooks/LoadUserFromLocalStorage";// 로그인 상태를 유지하는 컴포넌트

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <LoadUserFromLocalStorage /> {/* 로그인 상태 복원 */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route
                path="/users/:userId"
                element={
                  <PrivateRoute>
                    <UserProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<div>SignUp Page로 이동</div>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

