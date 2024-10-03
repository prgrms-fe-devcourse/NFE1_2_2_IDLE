import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Trip Track에 오신 것을 환영합니다!</h1>
      <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
};

export default Home;
