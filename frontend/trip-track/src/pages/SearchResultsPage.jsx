import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/Search/SearchBar';
import PostGrid from '../components/Post/PostGrid';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, posts, updateSearchQuery, fetchPosts } = useSearch();
  const [resultsCount, setResultsCount] = useState(0);
  const [sortOrder, setSortOrder] = useState('latest');

  // URL의 쿼리 파라미터에서 검색어 및 필터링 값 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';

    // '@'로 시작하는 검색어인 경우 사용자 검색 페이지로 리디렉션
    if (query.startsWith('@')) {
      navigate(`/search-users?query=${query}`);
      return;
    }

    updateSearchQuery(query);
    fetchPosts(query, {}, sortOrder); // 초기 필터 조건을 빈 객체로 설정하여 검색어만 반영
  }, [location.search, sortOrder]);

  // 검색 결과가 업데이트될 때마다 화면에 반영
  useEffect(() => {
    // 검색 결과가 업데이트될 때 resultsCount가 정확하게 반영되도록 함
    if (posts.length !== resultsCount) {
      setResultsCount(posts.length);
    }
  }, [posts, resultsCount]);

  // 검색어 입력 후 엔터키나 검색 버튼 클릭 시 실행
  const handleSearch = (query) => {
    updateSearchQuery(query);
    fetchPosts(query, {}, sortOrder); // 필터 조건 없이 검색어만 반영
    navigate(`?query=${query}`);
  };

  return (
    <div className="search-results-page-container">
      <div className="search-bar-and-sort">
        <div className="search-bar-section">
          <div className="search-bar-wrapper">
            <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
          </div>
          {/* 정렬 드롭다운 */}
          <select className="sort-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="likes">좋아요 순</option>
          </select>
        </div>
      </div>

      <div className="search-results-container">
        <div className="search-results-text">
          <h1>{`"${searchQuery}"에 대한 검색 결과`}</h1>
          <h2>포스트 {resultsCount}개를 발견했습니다</h2>
        </div>
        <PostGrid searchQuery={searchQuery} posts={posts} />
      </div>
    </div>
  );
};

export default SearchResultsPage;