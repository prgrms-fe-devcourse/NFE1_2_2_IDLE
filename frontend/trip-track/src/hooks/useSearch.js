import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { searchQueryState, searchPostsState, filtersState } from '../state/searchState';
import { searchAll } from '../services/postService';
import { filterPosts, calculateResultsCount, sortPosts } from '../utils/filterUtils';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [posts, setPosts] = useRecoilState(searchPostsState);
  const [filters, setFilters] = useRecoilState(filtersState);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      fetchPosts(searchQuery, filters);
    }
  }, [filters, searchQuery]);

  // 검색어 업데이트 함수
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // 필터 업데이트 함수
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // 검색 및 필터링 조건에 따른 포스트 데이터 API 호출
  const fetchPosts = async (query = searchQuery, filterOptions = filters, sortOrder = 'latest') => {
    try {
      const response = await searchAll(query); // 전체 검색 API 호출
      const filteredPosts = filterPosts(response, query, filterOptions); // 필터링된 포스트 가져옴
      const sortedPosts = sortPosts(filteredPosts, sortOrder); // 정렬된 결과를 가져옴

      setPosts(sortedPosts);
      setResultsCount(calculateResultsCount(filteredPosts, query, filterOptions)); // 필터된 결과 개수 계산
    } catch (error) {
      console.error('Failed to fetch posts:', error.message);
    }
  };

  return { searchQuery, posts, filters, resultsCount, updateSearchQuery, updateFilters, fetchPosts, calculateResultsCount };
};

export default useSearch;