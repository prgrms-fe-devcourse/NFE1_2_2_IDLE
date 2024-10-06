import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import searchIcon from '../../assets/search-icon.svg';

const SearchBar = ({ initialValue, onSearch }) => {
  const [query, setQuery] = useState(initialValue || '');

  // 초기값 변경 시 query 상태 업데이트
  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery && onSearch) {
      onSearch(trimmedQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar-container">
      {/* 검색어 입력 필드 */}
      <input
        type="text"
        className="search-bar-input"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력하세요"
      />
      {/* 검색 버튼 */}
      <button className="search-bar-button" onClick={handleSearchClick}>
        {/* search-icon.svg 이미지 아이콘 추가 */}
        <img src={searchIcon} alt="Search Icon" className="search-bar-icon" />
      </button>
    </div>
  );
};

// PropTypes 정의
SearchBar.propTypes = {
  initialValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
