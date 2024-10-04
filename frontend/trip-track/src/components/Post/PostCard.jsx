import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { formatTimeAgo } from "../../utils/formatDate";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${post._id}`); // 포스트 ID로 라우팅
  };

  return (
    <div
      onClick={handleCardClick}
      className="card h-100 border-primary"
      style={{ cursor: "pointer" }}
    >
      {/* {post.thumbnail && (
        <img
          src={post.thumbnail}
          className="card-img-top"
          alt={post.title}
          style={{ padding: "15px", borderRadius: "8%" }}
        />
      )} */}
      <img
        src="/images/postImg.jpg"
        className="card-img-top"
        alt={post.title}
        style={{ padding: "15px", borderRadius: "8%" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{post.title}</h5>
        <div className="mb-3">
          <span>
            {post.dailyLocations?.[0]?.locations?.[0]?.name ||
              "Unknown Location"}
          </span>
          {/* <div className="text-muted">
            {new Date(post.dates[0]).toLocaleDateString()} -{" "}
            {new Date(post.dates[1]).toLocaleDateString()}
          </div> */}
        </div>
        <div className="d-flex flex-column">
          <span className="text-muted">{formatTimeAgo(post.createdAt)}</span>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span>{post.author.fullName || "Unknown Author"}</span>
            <div className="d-flex align-items-center">
              <FaHeart className="text-danger ms-1" />
              <span className="ms-1">{post.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
