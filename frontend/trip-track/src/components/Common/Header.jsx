import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // 스타일링을 위한 CSS 파일 (선택 사항)

const Header = () => {
  return (
    <header className="header">
      <h1>Trip Track</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          {/* 필요에 따라 다른 링크 추가 */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;