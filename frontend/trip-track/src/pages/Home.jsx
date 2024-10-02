import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Trip Track에 오신 것을 환영합니다!</h1>
      <p>여행 경험을 공유하고 다른 사람들의 여행을 탐험해보세요.</p>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Home;
