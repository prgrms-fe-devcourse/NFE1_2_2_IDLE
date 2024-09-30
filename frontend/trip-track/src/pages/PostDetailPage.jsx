import PostContent from "../components/Post/PostContent";


const PostDetailPage = () => {
  const dummyLocationData = {
    name: '서울 타워',
    title: '서울 타워 방문기',
    photos: [
      'https://via.placeholder.com/400x300?text=Photo+1',
      'https://via.placeholder.com/400x300?text=Photo+2',
      'https://via.placeholder.com/400x300?text=Photo+3',
    ],
    description: '서울 타워는 서울의 중심에서 도시 전체를 한눈에 볼 수 있는 랜드마크입니다. 여행 첫날에 방문한 이곳은 기대 이상이었어요! 전망대에서 본 서울의 야경은 정말 멋졌고, 다양한 음식점과 기념품 가게도 매우 인상적이었어요. 하루 종일 이곳에서 시간을 보내도 지루하지 않을 정도로 매력적인 장소였습니다.',
    comments: [
      {
        profileImage: 'https://via.placeholder.com/50',
        author: 'User1',
        time: '2시간 전',
        content: '정말 멋진 여행이었어요!',
      },
      {
        profileImage: 'https://via.placeholder.com/50',
        author: 'User2',
        time: '1시간 전',
        content: '꼭 가보고 싶네요.',
      },
    ],
    likes: ['User1', 'User2', 'User3'],
  };

  return (
    <div>
      {/* 다른 포스트 관련 정보 표시 */}
      <PostContent locationData={dummyLocationData} />
    </div>
  );
};

export default PostDetailPage;
