import './SearchBar.css';
import { useState } from 'react';

const SearchBar = ({ setFilter }) => {
    const [searchText, setSearchText] = useState('');
    const isLoggedIn = !!localStorage.getItem('token');
    const [selectedTab, setSelectedTab] = useState('trending'); // 기본값은 트렌딩
    const [dropDownValue, setDropDownValue] = useState('this-week'); // 기본 드롭다운 값

    const handleSearch = () => {
        // 검색 처리 로직 (다른 팀원이 구현한 부분으로 이동)
        console.log('Search:', searchText);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search posts..."
            />
            <button onClick={handleSearch}>🔍</button>

            {/* 조건 설정 버튼 (다른 팀원이 구현할 모달) */}
            <button>Condition Settings</button>

            <div className="tabs">
                <button onClick={() => setFilter('trending')}>Trending</button>
                <button onClick={() => setFilter('new')}>New</button>
                {isLoggedIn && <button onClick={() => setFilter('following')}>Following</button>}

                {/* 드롭다운 메뉴 (트렌딩 탭에서만 활성화) */}
                {selectedTab === 'trending' && (
                    <select
                        value={dropDownValue}
                        onChange={(e) => setDropDownValue(e.target.value)}
                    >
                        <option value="this-week">This Week</option>
                        <option value="this-quarter">This Quarter</option>
                        <option value="this-year">This Year</option>
                    </select>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
