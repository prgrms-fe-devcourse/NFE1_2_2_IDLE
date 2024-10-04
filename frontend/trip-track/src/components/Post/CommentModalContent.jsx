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

    const getRelativeTime = (date) => {
        const now = new Date();
        const diff = (now - new Date(date)) / 1000; // 현재와 `createdAt`의 차이(초 단위)

        const timeUnits = [
            { unit: '년', value: 60 * 60 * 24 * 365 },
            { unit: '개월', value: 60 * 60 * 24 * 30 },
            { unit: '일', value: 60 * 60 * 24 },
            { unit: '시간', value: 60 * 60 },
            { unit: '분', value: 60 },
            { unit: '초', value: 1 },
        ];

        for (let { unit, value } of timeUnits) {
            const diffInUnit = Math.floor(diff / value);
            if (diffInUnit > 0) {
                return `${diffInUnit}${unit} 전`;
            }
        }

        return '방금 전';
    };


    return (
        <div className="comment-modal">
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                        <img src={comment.author.profileImage} alt="프로필" className="comment-profile-image" />
                        <div className="comment-content">
                            <span className="comment-author">{comment.author.fullName}</span>
                            <span className="comment-time">{getRelativeTime(comment.createdAt)}</span>
                            <p>{comment.comment}</p>
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
                    <span className="char-count">{charCount}/300</span>
                    <button className="submit-comment" onClick={handleCommentSubmit}>
                        댓글 작성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModalContent;
