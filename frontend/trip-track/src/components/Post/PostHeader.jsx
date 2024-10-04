import { deletePostById } from '../../../../../backend/api'; // API 함수 가져오기
import './PostHeader.css'; // 스타일 파일 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate

const PostHeader = ({ title, purpose, groupType, season, isAuthor, postId }) => {
    const navigate = useNavigate();

    // 삭제 버튼 클릭 핸들러
    const handleDelete = async () => {
        try {
            await deletePostById(postId); // 포스트 삭제 API 호출 (API 함수 필요)
            alert('포스트가 삭제되었습니다.');
            navigate('/'); // 삭제 후 메인 페이지로 이동
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // 수정 버튼 클릭 핸들러
    const handleEdit = () => {
        navigate(`/posts/edit/${postId}`); // 수정 페이지로 이동
    };

    // 공유 버튼 클릭 핸들러
    const handleShare = () => {
        alert(`포스트 링크가 복사되었습니다: ${window.location.href}`);
    };

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
                        <button className="post-button delete" onClick={handleDelete}>삭제</button>
                        <button className="post-button edit" onClick={handleEdit}>수정</button>
                    </div>
                ) : (
                    <button className="post-button share" onClick={handleShare}>공유</button>
                )}
            </div>
        </div>
    );
};

export default PostHeader;
