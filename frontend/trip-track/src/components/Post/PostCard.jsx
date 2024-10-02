import './PostCard.css';

const PostCard = () => {
    // 더미 데이터 선언
    const postData = {
        image: 'https://images.unsplash.com/photo-1646187582419-a8c67b3170ab?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '가을 제주도 캠핑, 억새밭에서 맞이한 첫 일출',
        location: '제주도',
        startDate: '2023-10-05',
        endDate: '2024-10-07',
        likeCount: 94,
        author: '최캠핑',
        createdAt: '11개월 전'
    };

    const formattedStartDate = new Date(postData.startDate).toLocaleDateString();
    const formattedEndDate = new Date(postData.endDate).toLocaleDateString();

    return (
        <div className="post-card">
            {/* 이미지 영역 */}
            <div className="post-image">
                <img src={postData.image} alt={postData.title} />
            </div>

            {/* 포스트 제목, 위치, 날짜 */}
            <div className="post-content">
                <h3 className="post-title">{postData.title}</h3>
                <p className="post-location">{postData.location}</p>
                <p className="post-dates">
                    {formattedStartDate} ~ {formattedEndDate}
                </p>
                <p className="post-timestamp">{postData.createdAt}</p>
            </div>

            {/* 좋아요 및 작성일 */}
            <div className="post-footer">
                
                <p className="post-author">{postData.author}</p>
                <div className="post-likes">
                    <span className="like-icon">❤️</span>
                    <span className="like-count">{postData.likeCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
