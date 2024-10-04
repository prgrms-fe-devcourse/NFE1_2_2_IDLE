import { useState } from 'react';
import Modal from '../Common/Modal';
import LikeModalContent from './LikeModalContent';
import './PostLike.css';

const PostLike = ({ postId, initialLikeCount, usersLiked }) => {
    const [isLiked, setIsLiked] = useState(false);  // 좋아요 여부 관리
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);  // 좋아요 수 관리
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열림 여부 관리

    // 좋아요 토글
    const handleLikeToggle = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);  // 좋아요 취소 시
        } else {
            setLikeCount(likeCount + 1);  // 좋아요 추가 시
        }
        setIsLiked(!isLiked);
    };

    // 모달 토글
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="post-like-container">
            <button className="like-button" onClick={handleLikeToggle}>
                {isLiked ? '❤️' : '🤍'} {likeCount}
            </button>
            <button className="more-likes-button" onClick={handleModalToggle}>
                ...
            </button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
                    <LikeModalContent usersLiked={usersLiked} />
                </Modal>
            )}
        </div>
    );
};

export default PostLike;
