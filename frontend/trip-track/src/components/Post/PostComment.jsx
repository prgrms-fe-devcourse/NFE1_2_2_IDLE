import { useState } from 'react';
import Modal from '../Common/Modal';
import CommentModalContent from './CommentModalContent';

const PostComment = ({ postId, initialCommentCount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const comments = [
        { author: 'User1', time: '2시간 전', content: '정말 멋진 여행이었어요!', profileImage: 'https://example.com/image1.jpg' },
        { author: 'User2', time: '1시간 전', content: '꼭 가보고 싶네요.', profileImage: 'https://example.com/image2.jpg' }
    ];

    return (
        <div>
            <button onClick={handleModalToggle}>
                💬 {initialCommentCount || comments.length}
            </button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
                    <CommentModalContent comments={comments} />
                </Modal>
            )}
        </div>
    );
};

export default PostComment;
