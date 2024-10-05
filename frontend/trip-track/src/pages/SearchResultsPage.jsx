import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import Header from '../components/Common/Header';
import SearchBar from '../components/Search/SearchBar';
import PostGrid from '../components/Post/PostGrid';
import TripElementsButton from '../components/Filter/TripElementsButton';
import TripElementsModal from '../components/Filter/TripElementsModal';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, posts, filters, resultsCount, updateSearchQuery, updateFilters, fetchPosts } = useSearch();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tempFilters, setTempFilters] = useState(filters);
  const [sortOrder, setSortOrder] = useState('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL의 쿼리 파라미터에서 검색어 및 필터링 값 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    updateSearchQuery(query);
    fetchPosts(query, filters, sortOrder);
  }, [location.search, filters, sortOrder]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = (query) => {
    updateSearchQuery(query);
    fetchPosts(query, filters, sortOrder);
    navigate(`?query=${query}`);
  };

  const handleFilterApply = (appliedFilters) => {
    updateFilters(appliedFilters);
    setTempFilters(appliedFilters);
    fetchPosts(searchQuery, appliedFilters, sortOrder);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="page-container">
      <Header />

      <div className="search-bar-and-sort">
        <div className="search-bar-section">
          <div className="search-bar-wrapper">
            <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
            <TripElementsButton onClick={openModal} />
          </div>
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
        <PostGrid searchQuery={searchQuery} posts={filteredPosts} />
      </div>

      {isModalOpen && (
        <TripElementsModal
          onClose={closeModal}
          onApply={handleFilterApply}
          resultsCount={resultsCount}
          updateFilters={updateFilters}
          initialFilters={tempFilters}
          posts={posts} // posts prop 전달
          searchQuery={searchQuery || ''} // searchQuery prop 전달, 기본값 설정
        />
      )}
    </div>
  );
};

export default SearchResultsPage;