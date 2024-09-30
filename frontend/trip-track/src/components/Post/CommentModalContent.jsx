import { useState } from 'react';
import './CommentModalContent.css';

const CommentModalContent = ({ comments }) => {
    const [newComment, setNewComment] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleNewCommentChange = (e) => {
        const value = e.target.value;
        setNewComment(value);
        setCharCount(value.length);
    };

    const handleCommentSubmit = () => {
        // 댓글 제출 로직 (API 연동 부분)
        setNewComment('');
        setCharCount(0);
    };

    return (
        <div className="comment-modal">
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                        <img src={comment.profileImage} alt="프로필" className="comment-profile-image" />
                        <div className="comment-content">
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-time">{comment.time}</span>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="comment-input-container">
                <textarea
                    className="comment-input"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    placeholder="댓글을 입력하세요"
                    maxLength="300"
                />
                <div className="comment-footer">
                    <span className=''>{charCount}/300</span>
                    <button className="submit-comment" onClick={handleCommentSubmit}>
                        댓글 작성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModalContent;
