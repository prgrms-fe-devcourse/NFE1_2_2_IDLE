import { useEffect, useState } from 'react';
import { getPostById } from "../api"; // API 호출 함수 임포트
import PostContent from "../components/Post/PostContent";
import PostHeader from "../components/Post/PostHeader";

const PostDetailPage = ({ postId }) => {
  const [postData, setPostData] = useState(null); // API로 받아온 포스트 데이터를 저장

  // API 호출로 포스트 데이터 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getPostById(postId); // postId에 맞는 데이터를 API로부터 가져옴
        setPostData(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!postData) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 표시
  }

  return (
    <div>
      {/* 포스트 데이터 전달 */}
      <PostHeader title={postData.title} purpose={postData.tripPurpose} groupType={postData.tripGroupType} season={postData.season} isAuthor={postData.isAuthor} />
      <PostContent dailyLocations={postData.dailyLocations} />
    </div>
  );
};

export default PostDetailPage;

