import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilter, onTabChange }) => {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Following');
    const [selectedOption, setSelectedOption] = useState('이번 주');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleFilterClick = () => {
        if (onFilter) {
            onFilter();
        }
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (onTabChange) {
            onTabChange(tabName);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="search-bar-container">
            {/* 왼쪽: 검색창과 조건 설정 버튼 */}
            <div className="search-bar-wrap">

                <div className="search-input">
                    <div className="search-bar">
                    <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="포스트 또는 @사용자 검색"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-btn">
                    🔍
                </button>
                    </div>
                </div>

                <button onClick={handleFilterClick} className="filter-btn">
                    조건 설정
                </button>
            </div>


            {/* 오른쪽: 드롭다운 + 탭 버튼들 */}
            <div className="tab-container">
                {/* 드롭다운 (New 탭에서만 활성화) */}
                {activeTab === 'New' && (
                    <div className="dropdown">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button">
                            {selectedOption}
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li onClick={() => handleOptionClick('이번 주')}>이번 주</li>
                                <li onClick={() => handleOptionClick('이번 분기')}>이번 분기</li>
                                <li onClick={() => handleOptionClick('올해')}>올해</li>
                            </ul>
                        )}
                    </div>
                )}

                {/* 탭 버튼 */}
                <button
                    className={`tab-button ${activeTab === 'New' ? 'active' : ''}`}
                    onClick={() => handleTabClick('New')}
                >
                    New
                </button>
                <button
                    className={`tab-button ${activeTab === 'Trending' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Trending')}
                >
                    Trending
                </button>
                <button
                    className={`tab-button ${activeTab === 'Following' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Following')}
                >
                    Following
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
