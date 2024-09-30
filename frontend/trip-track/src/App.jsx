import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Header from './components/Common/Header';

const App = () => {
  return (
    <>
      <Header/>
      <Router>
        <nav>
          <Link to="/SignUp">sign up page</Link>
          <br/>
          <Link to="/SignIn">sign in page</Link>
        </nav>
        <Routes>
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path='/SignIn' element={<SignInPage/>} />
        </Routes>
      </Router>
    </>
    
  );
};

export default App;
