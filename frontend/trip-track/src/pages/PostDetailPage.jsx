import { useEffect, useState } from 'react';
import { getPostById } from "../../../../backend/api.js"; // API 호출 함수 임포트
import PostContent from "../components/Post/PostContent";
import PostHeader from "../components/Post/PostHeader";
import PostComment from '../components/Post/PostComment.jsx';
import PostLike from '../components/Post/PostLike.jsx';

const PostDetailPage = ({ postId }) => {
  const dummyPostData = {
    _id: "post123", // 포스트 ID
    title: "여름 휴가 여행기", // 포스트 제목
    image: "https://via.placeholder.com/150", // 썸네일 이미지
    imagePublicId: "imagePublic123", // 이미지 public ID
    tripPurpose: "휴가", // 여행 목적
    tripGroupType: "가족", // 여행 인원 유형
    season: "여름", // 여행 계절
    likes: [
      {
        _id: "like123",
        user: "user123", // 사용자 ID
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T12:34:56Z",
        updatedAt: "2023-10-03T12:34:56Z"
      },
      {
        _id: "like124",
        user: "user124", // 사용자 ID
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T13:00:00Z",
        updatedAt: "2023-10-03T13:00:00Z"
      },
      {
        _id: "like125",
        user: "user125", // 사용자 ID
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T14:00:00Z",
        updatedAt: "2023-10-03T14:00:00Z"
      }
    ],
    comments: [
      {
        _id: "comment123",
        comment: "이곳은 정말 아름다워요!", // 댓글 내용
        author: {
          _id: "user123",
          fullName: "홍길동",
          profileImage: "https://via.placeholder.com/100", // 프로필 이미지
        },
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T12:34:56Z",
        updatedAt: "2023-10-03T12:34:56Z"
      },
      {
        _id: "comment124",
        comment: "가족과 함께라 더 좋았어요.", // 댓글 내용
        author: {
          _id: "user124",
          fullName: "김영희",
          profileImage: "https://via.placeholder.com/100", // 프로필 이미지
        },
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T13:00:00Z",
        updatedAt: "2023-10-03T13:00:00Z"
      },
      {
        _id: "comment125",
        comment: "사진이 너무 멋져요!", // 댓글 내용
        author: {
          _id: "user125",
          fullName: "이철수",
          profileImage: "https://via.placeholder.com/100", // 프로필 이미지
        },
        post: "post123", // 포스트 ID
        createdAt: "2023-10-03T14:00:00Z",
        updatedAt: "2023-10-03T14:00:00Z"
      }
    ],
    dailyLocations: [
      {
        date: '2023-10-01',
        locations: [
          {
            name: '산속 정원',
            lat: 37.5665,
            lng: 126.9780,
            title: '자연과 함께하는 휴식',
            photos: [
              { _id: "photo123", url: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Slide1' },
              { _id: "photo124", url: 'https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Slide2' },
              { _id: "photo125", url: 'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Slide3' }
            ],
            description: '산속 정원에서의 아침은 맑은 공기와 아름다운 경치를 제공합니다. 가족과 함께 조용히 산책하기 좋은 장소입니다. 방문객들은 자연과 가까워질 수 있는 기회를 갖게 됩니다.',
            visitedOrder: 1
          },
          {
            name: '호수 공원',
            lat: 37.5700,
            lng: 126.9800,
            title: '호수와 함께하는 여유',
            photos: [
              { _id: "photo126", url: 'https://via.placeholder.com/600x400/FFFF00/000000?text=Slide1' },
              { _id: "photo127", url: 'https://via.placeholder.com/600x400/FF00FF/000000?text=Slide2' },
              { _id: "photo128", url: 'https://via.placeholder.com/600x400/00FFFF/000000?text=Slide3' }
            ],
            description: '호수 공원에서의 오후는 가족들과 함께 휴식을 취하기에 완벽합니다. 넓은 호수와 푸른 잔디는 여유로운 분위기를 만들어줍니다.',
            visitedOrder: 2
          },
          {
            name: '산책로',
            lat: 37.5800,
            lng: 126.9900,
            title: '산과 계곡을 잇는 산책로',
            photos: [
              { _id: "photo129", url: 'https://via.placeholder.com/600x400/FFFFFF/000000?text=Slide1' },
              { _id: "photo130", url: 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Slide2' },
              { _id: "photo131", url: 'https://via.placeholder.com/600x400/CCCCCC/000000?text=Slide3' }
            ],
            description: '자연 속에서 마음을 비우고 휴식을 취할 수 있는 산책로입니다. 계곡과 산을 잇는 길을 걸으며 몸과 마음을 힐링할 수 있습니다.',
            visitedOrder: 3
          }
        ]
      },
      {
        date: '2023-10-02',
        locations: [
          {
            name: '해변가',
            lat: 36.5665,
            lng: 126.9780,
            title: '모래사장에서의 자유로움',
            photos: [
              { _id: "photo132", url: 'https://via.placeholder.com/600x400/FFAAAA/000000?text=Slide1' },
              { _id: "photo133", url: 'https://via.placeholder.com/600x400/AAFFAA/000000?text=Slide2' },
              { _id: "photo134", url: 'https://via.placeholder.com/600x400/AAAAFF/000000?text=Slide3' }
            ],
            description: '해변가에서 즐기는 자유로운 시간은 여행의 하이라이트입니다. 모래사장에서의 산책과 바다의 파도를 느낄 수 있습니다.',
            visitedOrder: 1
          },
          {
            name: '바다 전망대',
            lat: 36.5700,
            lng: 126.9800,
            title: '푸른 바다를 내려다보는 곳',
            photos: [
              { _id: "photo135", url: 'https://via.placeholder.com/600x400/FFBBBB/000000?text=Slide1' },
              { _id: "photo136", url: 'https://via.placeholder.com/600x400/BBFFBB/000000?text=Slide2' },
              { _id: "photo137", url: 'https://via.placeholder.com/600x400/BBBBFF/000000?text=Slide3' }
            ],
            description: '바다 전망대에서는 끝없이 펼쳐진 푸른 바다를 감상할 수 있습니다. 가족과 함께하는 특별한 시간을 보낼 수 있는 곳입니다.',
            visitedOrder: 2
          },
          {
            name: '항구 마을',
            lat: 36.5800,
            lng: 126.9900,
            title: '항구와 어우러진 마을의 정취',
            photos: [
              { _id: "photo138", url: 'https://via.placeholder.com/600x400/CCFFFF/000000?text=Slide1' },
              { _id: "photo139", url: 'https://via.placeholder.com/600x400/FFCCCC/000000?text=Slide2' },
              { _id: "photo140", url: 'https://via.placeholder.com/600x400/CCCCFF/000000?text=Slide3' }
            ],
            description: '항구 마을의 풍경은 여유롭고 평화로운 느낌을 줍니다. 바닷바람을 맞으며 마을을 걸어볼 수 있는 기회입니다.',
            visitedOrder: 3
          }
        ]
      },
      {
        date: '2023-10-03',
        locations: [
          {
            name: '산림욕장',
            lat: 37.4665,
            lng: 126.8780,
            title: '자연 속에서의 힐링',
            photos: [
              { _id: "photo141", url: 'https://via.placeholder.com/600x400/FF4444/FFFFFF?text=Slide1' },
              { _id: "photo142", url: 'https://via.placeholder.com/600x400/44FF44/FFFFFF?text=Slide2' },
              { _id: "photo143", url: 'https://via.placeholder.com/600x400/4444FF/FFFFFF?text=Slide3' }
            ],
            description: '산림욕장은 자연의 소리를 들으며 휴식을 취하기에 완벽한 장소입니다. 산림욕을 즐기며 자연과 교감할 수 있는 시간이 주어집니다.',
            visitedOrder: 1
          },
          {
            name: '자연 박물관',
            lat: 37.4700,
            lng: 126.8800,
            title: '자연과 역사 속으로',
            photos: [
              { _id: "photo144", url: 'https://via.placeholder.com/600x400/FF9999/000000?text=Slide1' },
              { _id: "photo145", url: 'https://via.placeholder.com/600x400/99FF99/000000?text=Slide2' },
              { _id: "photo146", url: 'https://via.placeholder.com/600x400/9999FF/000000?text=Slide3' }
            ],
            description: '자연 박물관에서는 자연의 역사와 생태계를 배울 수 있습니다. 가족과 함께 교육적인 시간을 보낼 수 있는 장소입니다.',
            visitedOrder: 2
          },
          {
            name: '계곡 마을',
            lat: 37.4800,
            lng: 126.8900,
            title: '계곡을 따라 걷는 즐거움',
            photos: [
              { _id: "photo147", url: 'https://via.placeholder.com/600x400/CCCCCC/000000?text=Slide1' },
              { _id: "photo148", url: 'https://via.placeholder.com/600x400/FFCCCC/000000?text=Slide2' },
              { _id: "photo149", url: 'https://via.placeholder.com/600x400/CCCCFF/000000?text=Slide3' }
            ],
            description: '계곡 마을은 시원한 계곡물과 아름다운 경치를 제공합니다. 산과 계곡을 함께 느낄 수 있는 멋진 장소입니다.',
            visitedOrder: 3
          }
        ]
      },
      {
        date: '2023-10-04',
        locations: [
          {
            name: '바다 터널',
            lat: 38.5665,
            lng: 127.9780,
            title: '바다 밑을 걷는 색다른 경험',
            photos: [
              { _id: "photo150", url: 'https://via.placeholder.com/600x400/FF5555/000000?text=Slide1' },
              { _id: "photo151", url: 'https://via.placeholder.com/600x400/55FF55/000000?text=Slide2' },
              { _id: "photo152", url: 'https://via.placeholder.com/600x400/5555FF/000000?text=Slide3' }
            ],
            description: '바다 터널은 바다 밑을 걷는 색다른 경험을 제공합니다. 바다 생물들을 가까이에서 볼 수 있어 가족 여행객들에게 인기가 많은 장소입니다.',
            visitedOrder: 1
          },
          {
            name: '해변 산책로',
            lat: 38.5700,
            lng: 127.9800,
            title: '해변을 따라 이어지는 길',
            photos: [
              { _id: "photo153", url: 'https://via.placeholder.com/600x400/FFBBBB/FFFFFF?text=Slide1' },
              { _id: "photo154", url: 'https://via.placeholder.com/600x400/BBFFBB/FFFFFF?text=Slide2' },
              { _id: "photo155", url: 'https://via.placeholder.com/600x400/BBBBFF/FFFFFF?text=Slide3' }
            ],
            description: '해변 산책로는 푸른 바다를 바라보며 걷기에 좋은 장소입니다. 가족과 함께 바닷바람을 맞으며 여유로운 시간을 보낼 수 있습니다.',
            visitedOrder: 2
          },
          {
            name: '등대 전망대',
            lat: 38.5800,
            lng: 127.9900,
            title: '바다 위의 등대를 감상하는 곳',
            photos: [
              { _id: "photo156", url: 'https://via.placeholder.com/600x400/CCCCCC/000000?text=Slide1' },
              { _id: "photo157", url: 'https://via.placeholder.com/600x400/FFCCCC/000000?text=Slide2' },
              { _id: "photo158", url: 'https://via.placeholder.com/600x400/CCCCFF/000000?text=Slide3' }
            ],
            description: '등대 전망대에서는 끝없이 펼쳐진 바다와 그 위에 우뚝 선 등대를 감상할 수 있습니다. 저녁 노을과 함께 특별한 시간을 보낼 수 있습니다.',
            visitedOrder: 3
          }
        ]
      }
    ],
    channel: {
      _id: "channel123", // 채널 ID
      posts: ["post123"], // 해당 채널에 포함된 포스트 목록
      name: "여행 이야기", // 채널 이름
      description: "여행과 관련된 모든 이야기", // 채널 설명
      createdAt: "2023-09-30T12:00:00Z",
      updatedAt: "2023-09-30T12:00:00Z"
    },
    author: {
      _id: "author123", // 작성자 ID
      fullName: "이몽룡", // 작성자 이름
      profileImage: "https://via.placeholder.com/150", // 프로필 이미지
      createdAt: "2023-09-01T12:00:00Z",
      updatedAt: "2023-09-01T12:00:00Z"
    },
    createdAt: "2023-09-30T12:00:00Z", // 포스트 생성 날짜
    updatedAt: "2023-10-03T12:34:56Z" // 포스트 수정 날짜
  };

  const postData = dummyPostData;


  // const [postData, setPostData] = useState(null); // API로 받아온 포스트 데이터를 저장

  // // API 호출로 포스트 데이터 가져오기
  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     try {
  //       const data = await getPostById(postId); // postId에 맞는 데이터를 API로부터 가져옴
  //       setPostData(data);
  //     } catch (error) {
  //       console.error('Error fetching post data:', error);
  //     }
  //   };

  //   fetchPostData();
  // }, [postId]);

  // if (!postData) {
  //   return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 표시
  // }

  return (
    <div>
      {/* 포스트 데이터 전달 */}
      <PostHeader title={postData.title} purpose={postData.tripPurpose} groupType={postData.tripGroupType} season={postData.season} isAuthor={postData.isAuthor} />
      <PostContent dailyLocations={postData.dailyLocations} />
      <PostLike postId={postData._id} initialLikeCount={postData.likes.length} usersLiked={postData.likes.map(like => like.user)} />
      <PostComment postId={postData._id} initialCommentCount={postData.comments.length} comments={postData.comments} />
    </div>
  );
};

export default PostDetailPage;

