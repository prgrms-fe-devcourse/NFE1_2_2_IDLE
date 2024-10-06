import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { searchQueryState, searchPostsState, searchUsersState } from '../state/searchState';
import { searchAll, getUserPosts } from '../services/postService';
import { searchUsers } from '../services/userService';
import { sortPosts } from '../utils/filterUtils';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [posts, setPosts] = useRecoilState(searchPostsState);
  const [users, setUsers] = useRecoilState(searchUsersState);
  const [resultsCount, setResultsCount] = useState(0);

  // 대상 채널 ID 설정
  const targetChannelId = '66ff3aae51e9a379d07c0b79';

  // 검색어가 업데이트될 때 실행되는 useEffect
  useEffect(() => {
    console.log("searchQuery in useEffect:", searchQuery); // searchQuery 값 출력

    if (searchQuery) {
      // 검색어가 '@'로 시작하는 경우에는 사용자 검색 수행
      if (searchQuery.startsWith('@')) {
        console.log("Starting user search with query:", searchQuery.slice(1));
        fetchUsers(searchQuery.slice(1)); // '@' 제외한 검색어로 사용자 검색
      } else {
        // 그렇지 않으면 포스트 검색 수행
        console.log("Starting post search with query:", searchQuery);
        fetchPosts(searchQuery);
      }
    } else {
      console.log("searchQuery is empty or undefined.");
    }
  }, [searchQuery]);

  // 검색어 업데이트 함수
  const updateSearchQuery = (query) => {
    console.log("Updating search query to:", query); // 검색어 업데이트 확인
    setSearchQuery(query);
  };

  // 검색 및 정렬 조건에 따른 포스트 데이터 API 호출
  const fetchPosts = async (query = searchQuery, filterOptions = {}, sortOrder = 'latest') => {
    try {
      const response = await searchAll(query); // 전체 검색 API 호출
      console.log("Fetched posts response:", response); // 응답 결과 출력

      // 특정 채널 ID와 일치하는 포스트만 필터링
      const channelFilteredPosts = response.filter((post) => {
        console.log("Post channel:", post.channel); // 각 포스트의 채널 ID 출력
        return post.channel === targetChannelId;
      });

      // 필터링된 결과를 정렬
      const sortedPosts = sortPosts(channelFilteredPosts, sortOrder);
      setPosts(sortedPosts); // 상태값에 설정
      setResultsCount(sortedPosts.length); // 필터링 결과 개수 계산 후 설정
    } catch (error) {
      console.error('Failed to fetch posts:', error.message);
    }
  };

  // 사용자 검색 및 특정 채널 ID와 일치하는 사용자 필터링 함수
  const fetchUsers = async (query) => {
    console.log("Fetching users with query:", query);
    
    if (!query) {
      console.log("Query is empty. Exiting function.");
      return;
    }

    try {
      const response = await searchUsers(query); // 전체 사용자 검색 API 호출
      console.log("Fetched users response:", response); // 검색된 사용자 결과 출력

      // 사용자 이름에 검색어가 포함되는지 확인
      const nameFilteredUsers = response.filter(user => user.fullName.toLowerCase().includes(query.toLowerCase()));
      console.log("Name filtered users:", nameFilteredUsers); // 이름에 검색어가 포함된 사용자 목록 출력

      // 채널 필터링 과정 추적
      const filteredUsers = [];

      // 검색된 사용자 각각에 대해 채널 ID 확인
      for (const user of nameFilteredUsers) {
        console.log(`Checking posts for user: ${user.fullName} (ID: ${user._id})`);
        const userPosts = await getUserPosts(user._id); // 사용자의 포스트 목록 가져오기
        console.log(`User ${user.fullName} posts:`, userPosts); // 사용자의 포스트 목록 출력

        if (userPosts.length > 0) {
          const userFirstPost = userPosts[0]; // 첫 번째 포스트 확인
          console.log(`User's first post channel ID: ${userFirstPost.channel ? userFirstPost.channel._id : 'No channel'}`);

          // 첫 번째 포스트의 채널 ID가 targetChannelId와 일치하는지 확인
          if (userFirstPost.channel && userFirstPost.channel._id === targetChannelId) {
            filteredUsers.push(user); // 일치하면 해당 사용자를 필터링된 목록에 추가
          }
        }
      }

      console.log("Final filtered users:", filteredUsers); // 최종 필터링된 사용자 목록 출력
      setUsers(filteredUsers); // 필터링된 사용자 목록 설정
      setResultsCount(filteredUsers.length); // 필터링 결과 개수 설정
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    }
  };

  return { searchQuery, posts, users, resultsCount, updateSearchQuery, fetchPosts, fetchUsers };
};

export default useSearch;