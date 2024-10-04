import './LikeModalContent.css';

const LikeModalContent = ({ usersLiked }) => {
    return (
        <div className="like-modal">
            <h2>좋아요를 누른 사용자</h2>
            <ul className="user-list">
                {usersLiked.map((user, index) => (
                    <li key={index} className="user-item">
                        <img src={user.profileImage} alt={user.name} className="user-image" />
                        <span className="user-name">{user.name}</span>
                        <button className="unfollow-button">Unfollow</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LikeModalContent;
