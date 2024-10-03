import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/images/logo.png";
import SignOutButton from "../Auth/SignOutButton";

const Header = () => {
  const userId = localStorage.getItem('userId'); 
  const image = localStorage.getItem('image')

  return (
    <header className="header">
      <div className="title">
        <img className="header-logo" src={Logo} alt="Logo" />
        <h1>Trip Track</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {userId ? (
            <>
              <li>
                <img src={image} alt="Profile" className="profile-image" />
              </li>
              <li>
                <SignOutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
