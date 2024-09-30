import { useState } from 'react';
import Modal from '../Common/Modal';  // 모달 컴포넌트를 import
import LikeModalContent from './LikeModalContent';  // 좋아요를 누른 사용자 목록 컴포넌트를 import


const PostLike = ({ postId, initialLikeCount }) => {
    // 좋아요 상태와 카운트
    const [isLiked, setIsLiked] = useState(false);  // 좋아요 여부를 관리
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);  // 좋아요 수를 관리
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달이 열려있는지 여부를 관리

    // 좋아요를 누른 사용자 데이터
    const usersLiked = [
        { name: 'User1', profileImage: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'User2', profileImage: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'User3', profileImage: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ];

    // 좋아요 버튼 클릭시 상태 변경
    const handleLikeToggle = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);  // 이미 좋아요를 눌렀다면, 좋아요 수를 줄인다
        } else {
            setLikeCount(likeCount + 1);  // 좋아요를 처음 누르는 경우, 좋아요 수를 증가시킨다
        }
        setIsLiked(!isLiked);  // 상태 토글
    };

    // 모달 열기/닫기
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);  // 모달 열기/닫기 상태를 토글
    };

    return (
        <div className="post-like-container">
            {/* 좋아요 버튼: 상태에 따라 하트 아이콘과 카운트 변경 */}
            <button className="like-button" onClick={handleLikeToggle}>
                {isLiked ? '❤️' : '🤍'} {likeCount}
            </button>

            {/* ... 버튼: 좋아요 목록을 여는 모달 */}
            <button className="more-likes-button" onClick={handleModalToggle}>
                ...
            </button>

            {/* 모달: 좋아요를 누른 사용자 목록 */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
                    <LikeModalContent usersLiked={usersLiked} />
                </Modal>
            )}
        </div>
    );
};

export default PostLike;
