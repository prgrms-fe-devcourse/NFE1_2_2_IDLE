import  { useEffect, useState } from 'react';
import './PostHeader.css'; // 스타일링 파일은 따로 작성해주세요.
import { getPostById, deletePostById } from '../../../../../backend/api'; // API 함수 가져오기
import { useNavigate } from 'react-router-dom'; 

const PostHeader = ({ postId }) => {
    const [postHeader, setPostHeader] = useState({
        title: '',
        purpose: '',
        groupType: '',
        season: '',
        isAuthor: false, // 작성자인지 여부
    });
    const navigate = useNavigate(); 

    // API 호출로 데이터 가져오기
    useEffect(() => {
        const fetchPostHeader = async () => {
            try {
                const data = await getPostById(postId); // postId로 API 호출
                setPostHeader({
                    title: data.title, // 포스트 제목
                    purpose: data.tripPurpose, // 여행 목적
                    groupType: data.tripGroupType, // 인원 유형
                    season: data.season, // 계절
                    isAuthor: data.isAuthor, // 작성자인지 여부
                });
            } catch (error) {
                console.error('Error fetching post header:', error);
            }
        };

        fetchPostHeader();
    }, [postId]);

    const { title, purpose, groupType, season, isAuthor } = postHeader;

    // 삭제 버튼 클릭 핸들러
    const handleDelete = async () => {
        try {
            await deletePostById(postId); // 포스트 삭제 API 호출
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
