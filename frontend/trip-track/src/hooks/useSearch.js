import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { searchQueryState, searchPostsState } from '../state/searchState';
import { searchAll } from '../services/postService';
import { filterPosts, calculateResultsCount, sortPosts } from '../utils/filterUtils';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [posts, setPosts] = useRecoilState(searchPostsState);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      fetchPosts(searchQuery);
    }
  }, [searchQuery]);

  // 검색어 업데이트 함수
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // 검색 및 정렬 조건에 따른 포스트 데이터 API 호출
  const fetchPosts = async (query = searchQuery, filterOptions = {}, sortOrder = 'latest') => {
    try {
      const response = await searchAll(query); // 전체 검색 API 호출
      const sortedPosts = sortPosts(response, sortOrder); // 정렬된 결과를 가져옴

      setPosts(sortedPosts);
      setResultsCount(sortedPosts.length); // 필터링 결과 개수 계산 후 설정
    } catch (error) {
      console.error('Failed to fetch posts:', error.message);
    }
  };

  return { searchQuery, posts, resultsCount, updateSearchQuery, fetchPosts };
};

export default useSearch;