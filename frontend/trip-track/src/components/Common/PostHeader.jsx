import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const PostHeader = ({ activeTab, onFilterChange, isCurrentUser, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태 추가

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // 검색 기능 실행
  };

  return (
    <div className="post-header d-flex justify-content-between mx-3">
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="포스트 검색"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 상태 업데이트
        />
        <button className="btn btn-outline-primary" type="submit">
          <CiSearch />
        </button>
      </form>

      <ul className="nav nav-underline">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "My Posts" ? "active" : ""}`}
            onClick={() => onFilterChange("My Posts")}
          >
            My Posts
          </button>
        </li>
        {isCurrentUser && (
          <>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "Likes" ? "active" : ""}`}
                onClick={() => onFilterChange("Likes")}
              >
                Likes
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PostHeader;
