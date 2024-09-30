import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import PostComment from './PostComment';
import PostLike from './PostLike';
import './PostContent.css'; // 스타일링은 여기서 처리합니다.

const PostContent = ({ locationData = {} }) => {
    const { name = '', title = '', photos = [], description = '', comments = [], likes = [] } = locationData;

    const truncatedDescription = photos.length > 0
        ? description.slice(0, 500)
        : description.slice(0, 1000);

    

    return (
        <div className="post-content">
            {/* 장소명 + 장소별 제목 */}
            <h2>{name}</h2>
            <h3>{title}</h3>

            {/* 사진 슬라이드 (사진이 있을 경우에만 렌더링) */}
            {photos.length > 0 && (
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,
                        autoplay: true,
                        pagination: false,
                    }}
                >
                    {photos.map((photo, index) => (
                        <SplideSlide key={index}>
                            <img src={photo} alt={`slide-${index}`} />
                        </SplideSlide>
                    ))}
                </Splide>
            )}

            {/* 텍스트 내용 */}
            <p>{truncatedDescription}</p>

            {/* 커뮤니티 기능 (댓글, 좋아요 컴포넌트) */}
            <div className="community-section">
                <PostLike postId={locationData._id} likes={likes} />
                <PostComment postId={locationData._id} comments={comments} />
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
                {/* 페이지네이션 로직은 props로 받은 데이터를 바탕으로 구현 */}
                <span>페이지네이션 기능</span>
            </div>
        </div>
    );
};

export default PostContent;