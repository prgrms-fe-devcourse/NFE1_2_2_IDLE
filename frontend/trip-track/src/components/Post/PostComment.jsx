import { useState } from 'react';
import Modal from '../Common/Modal';
import CommentModalContent from './CommentModalContent';
import './PostComment.css';


const PostComment = ({ postId, initialCommentCount, comments }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

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
