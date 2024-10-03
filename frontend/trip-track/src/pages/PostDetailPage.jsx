import PostContent from "../components/Post/PostContent";
import PostHeader from "../components/Post/PostHeader";


const PostDetailPage = () => {
  const dailyLocations = [
    {
      date: '2023-10-01',
      locations: [
        {
          name: '장소 1',
          title: '자연 속 음악과 맛',
          photos: [
            'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Slide1',
            'https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Slide2'
          ],
          description: '이곳은 자연의 멋진 경치를 감상할 수 있는 장소입니다.',
          visitedOrder: 1
        },
        {
          name: '장소 2',
          title: '바다와 하늘이 맞닿는 곳',
          photos: [
            'https://via.placeholder.com/600x400/FFFF00/000000?text=Slide1',
            'https://via.placeholder.com/600x400/FF00FF/000000?text=Slide2'
          ],
          description: '바다와 하늘이 맞닿은 멋진 곳입니다.',
          visitedOrder: 2
        }
      ]
    },
    {
      date: '2023-10-02',
      locations: [
        {
          name: '장소 3',
          title: '산과 계곡이 만나는 곳',
          photos: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Slide1',
            'https://via.placeholder.com/600x400/FFFFFF/000000?text=Slide2'
          ],
          description: '산과 계곡을 볼 수 있는 명소입니다.',
          visitedOrder: 1
        }
      ]
    }
  ];

  return (
    <div>
      <PostHeader />
      {/* 다른 포스트 관련 정보 표시 */}
      <PostContent dailyLocations={dailyLocations}/>
    </div>
  );
};

export default PostDetailPage;
