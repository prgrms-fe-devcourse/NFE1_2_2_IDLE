import './PostHeader.css'; // 스타일링 파일은 따로 작성해주세요.

// 더미 데이터
const dummyPostHeader = {
    title: '서울 여행을 했습니다. 그런데 유명 관광지를 곁들인',
    purpose: '휴양, 힐링',
    groupType: '친구',
    season: '겨울',
    isAuthor: false, // 작성자인지 여부 (true면 수정/삭제 버튼, false면 공유 버튼 표시)
};

const PostHeader = () => {
    const { title, purpose, groupType, season, isAuthor } = dummyPostHeader;

    return (
        <div className="post-header">
            {/* 좌측: 포스트 제목과 여행 목적, 인원, 계절 라벨 */}
            <div className="post-header-left">
                <h1 className="post-title">{title}</h1>
                <div className="post-labels">
                    <span className="post-label">{purpose}</span>
                    <span className="post-label">{groupType}</span>
                    <span className="post-label">{season}</span>
                </div>
            </div>

            {/* 우측: 포스트 관리 버튼 */}
            <div className="post-header-right">
                {isAuthor ? (
                    <div className="author-buttons">
                        <button className="post-button delete">삭제</button>
                        <button className="post-button edit">수정</button>
                    </div>
                ) : (
                    <button className="post-button share">공유</button>
                )}
            </div>
        </div>
    );
};

export default PostHeader;
