import './PostCard.css';

const PostCard = ({ post }) => {
    const formattedStartDate = new Date(post.startDate).toLocaleDateString();
    const formattedEndDate = new Date(post.endDate).toLocaleDateString();

    return (
        <div className="post-card">
            {/* 이미지 영역 */}
            <div className="post-image">
                <img src={post.image} alt={post.title} />
            </div>

            {/* 포스트 제목, 위치, 날짜 */}
            <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-location">{post.location}</p>
                <p className="post-dates">
                    {formattedStartDate} ~ {formattedEndDate}
                </p>
                <p className="post-timestamp">{post.createdAt}</p>
            </div>

            {/* 좋아요 및 작성일 */}
            <div className="post-footer">
                <p className="post-author">{post.author.fullName}</p>
                <div className="post-likes">
                    <span className="like-icon">❤️</span>
                    <span className="like-count">{post.likeCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
