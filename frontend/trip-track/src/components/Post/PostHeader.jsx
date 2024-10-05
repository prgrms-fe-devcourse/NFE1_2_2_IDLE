import './PostHeader.css'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const PostHeader = ({ post }) => {
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
    const isAuthor = localStorage.getItem('userId') === post.author._id;

    const handleEdit = () => {
        navigate(`/edit-post/${post._id}`); // useNavigate로 페이지 이동
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/posts/delete`, {
                    data: { id: post._id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate('/'); // 삭제 후 메인 페이지로 이동
            } catch (error) {
                console.error('Failed to delete post', error);
            }
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    };

    return (
        <div className="post-header">
            <h1>{post.title}</h1>
            {isAuthor ? (
                <div className="author-controls">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <button onClick={handleShare}>Share</button>
            )}
        </div>
    );
};

export default PostHeader;
