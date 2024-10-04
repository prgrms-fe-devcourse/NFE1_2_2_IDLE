import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, followUser, unfollowUser } from "../../services/userApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";

const FollowListModal = ({ followers, following, activeTab, setActiveTab }) => {
  const [followersFullNames, setFollowersFullNames] = useState([]);
  const [followingFullNames, setFollowingFullNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState); // 로그인한 사용자
  const setCurrentUser = useSetRecoilState(currentUserState); // 상태 업데이트

  useEffect(() => {
    const fetchUserNames = async () => {
      // Fetch followers list
      const fetchedFollowers = await Promise.all(
        followers.map(async (relation) => {
          const userData = await getUser(relation.follower);
          return {
            _id: relation._id,
            fullName: userData?.fullName || "Unknown",
            image: userData?.image || "/public/images/defaultProfile.png",
            userId: relation.follower,
          };
        })
      );
      setFollowersFullNames(fetchedFollowers);

      // Fetch following list
      const fetchedFollowing = await Promise.all(
        following.map(async (relation) => {
          const userData = await getUser(relation.user);
          return {
            _id: relation._id,
            fullName: userData?.fullName || "Unknown",
            image: userData?.image || "/public/images/defaultProfile.png",
            userId: relation.user,
          };
        })
      );
      setFollowingFullNames(fetchedFollowing);
    };

    fetchUserNames();
  }, [followers, following]);

  const handleFollow = async (userId) => {
    try {
      const newFollow = await followUser(userId);
      setFollowingFullNames((prev) => [...prev, { userId }]);

      // currentUser 상태 업데이트
      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: [...prevUser.following, newFollow],
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (followId, userId) => {
    try {
      await unfollowUser(followId);
      setFollowingFullNames((prev) =>
        prev.filter((user) => user._id !== followId)
      );

      // currentUser 상태 업데이트
      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: prevUser.following.filter(
          (follow) => follow.user !== userId
        ),
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleUserClick = (userId) => {
    // 프로필로 이동할 때 모달 닫기
    const modal = document.getElementById("followListModal");
    if (modal) {
      const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
    navigate(`/user/${userId}`);
  };

  // 로그인한 사용자가 팔로우했는지 여부 체크 함수
  const isFollowingUser = (userId) => {
    return currentUser.following.some((follow) => follow.user === userId);
  };

  const filteredFollowers = followersFullNames.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowing = followingFullNames.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="modal fade"
      id="followListModal"
      tabIndex="-1"
      aria-labelledby="followListModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-underline justify-content-center">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "followers" ? "active" : ""}`}
                  onClick={() => setActiveTab("followers")}
                >
                  Followers
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "following" ? "active" : ""}`}
                  onClick={() => setActiveTab("following")}
                >
                  Following
                </button>
              </li>
            </ul>

            <input
              type="text"
              className="form-control mb-3"
              placeholder={`${activeTab} 사용자 검색`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {activeTab === "followers" ? (
              <ul>
                {filteredFollowers.map((user) => (
                  <li
                    key={user._id}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #0066ff",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                    onClick={() => handleUserClick(user.userId)}
                  >
                    <img
                      src={user.image}
                      alt={user.fullName}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    {user.fullName}
                    {currentUser._id !== user.userId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          // 로그인한 사용자가 이 사용자를 팔로우했는지 확인
                          if (isFollowingUser(user.userId)) {
                            const followRelation = currentUser.following.find(
                              (follow) => follow.user === user.userId
                            );
                            if (followRelation) {
                              handleUnfollow(followRelation._id, user.userId); // 언팔로우 처리
                            }
                          } else {
                            handleFollow(user.userId); // 팔로우 처리
                          }
                        }}
                        style={{
                          marginLeft: "auto",
                          background: isFollowingUser(user.userId)
                            ? "#002050"
                            : "#0066ff",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                        }}
                      >
                        {isFollowingUser(user.userId) ? "Unfollow" : "Follow"}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {filteredFollowing.map((user) => (
                  <li
                    key={user._id}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #0066ff",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                    onClick={() => handleUserClick(user.userId)}
                  >
                    <img
                      src={user.image}
                      alt={user.fullName}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    {user.fullName}
                    {currentUser._id !== user.userId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          const followRelation = currentUser.following.find(
                            (follow) => follow.user === user.userId
                          );
                          if (followRelation) {
                            handleUnfollow(followRelation._id, user.userId); // 언팔로우 처리
                          }
                        }}
                        style={{
                          marginLeft: "auto",
                          background: "#002050",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                        }}
                      >
                        Unfollow
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowListModal;
