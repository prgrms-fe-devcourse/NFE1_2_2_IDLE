import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, followUser, unfollowUser } from "../../services/authService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";
import "react-toastify/dist/ReactToastify.css"; // toast 스타일 import

toast.configure();

const FollowListModal = ({ followers, following, activeTab, setActiveTab }) => {
  const [followersFullNames, setFollowersFullNames] = useState([]);
  const [followingFullNames, setFollowingFullNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [isProcessing, setIsProcessing] = useState(false); // 중복 요청 방지
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);  // 로그인한 사용자 정보 가져오기
  const setCurrentUser = useSetRecoilState(currentUserState);  // 상태 업데이트

  // 팔로워 및 팔로잉 유저 이름을 불러오는 함수
  const fetchUserNames = async () => {
    try {
      setLoading(true); // 데이터를 불러오는 동안 로딩 상태 설정
      // 팔로워 리스트
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

      // 팔로잉 리스트
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
    } catch (error) {
      toast.error("Failed to load users."); // 데이터 로드 실패 시 사용자에게 알림
    } finally {
      setLoading(false); // 데이터를 모두 불러오면 로딩 상태 해제
    }
  };

  // 팔로우 버튼 클릭 시
  const handleFollow = async (userId) => {
    if (isProcessing) return; // 중복 팔로우 방지
    setIsProcessing(true); // 요청 시작
    try {
      const newFollow = await followUser(userId);
      setFollowingFullNames((prev) => [...prev, { userId }]);

      // currentUser 상태 업데이트
      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: [...prevUser.following, newFollow],
      }));
      toast.success("Successfully followed!");  // 성공 시 사용자에게 알림
    } catch (error) {
      toast.error("Failed to follow user.");  // 팔로우 실패 시 알림
    } finally {
      setIsProcessing(false); // 요청 완료 후 다시 팔로우 가능
    }
  };

  // 언팔로우 버튼 클릭 시
  const handleUnfollow = async (followId, userId) => {
    if (isProcessing) return; // 중복 언팔로우 방지
    setIsProcessing(true); // 요청 시작
    try {
      await unfollowUser(followId);
      setFollowingFullNames((prev) =>
        prev.filter((user) => user._id !== followId)
      );

      // currentUser 상태 업데이트
      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: prevUser.following.filter((follow) => follow.user !== userId),
      }));
      toast.success("Successfully unfollowed!");  // 성공 시 사용자에게 알림
    } catch (error) {
      toast.error("Failed to unfollow user.");  // 언팔로우 실패 시 알림
    } finally {
      setIsProcessing(false); // 요청 완료 후 다시 언팔로우 가능
    }
  };

  // 유저 프로필로 이동
  const handleUserClick = (userId) => {
    const modal = document.getElementById("followListModal");
    if (modal) {
      const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
    navigate(`/users/${userId}`);
  };

  // 로그인한 사용자가 해당 유저를 팔로우하고 있는지 확인
  const isFollowingUser = (userId) => {
    return currentUser.following.some((follow) => follow.user === userId);
  };

  // 팔로워 및 팔로잉 리스트 필터링
  const filteredFollowers = followersFullNames.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowing = followingFullNames.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUserNames();
  }, [followers, following]);

  return (
    <div className="modal fade" id="followListModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {/* 로딩 중일 때 로딩 메시지 표시 */}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {/* 팔로워 및 팔로잉 탭 */}
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

                {/* 검색 입력 */}
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder={`${activeTab} 사용자 검색`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* 팔로워 리스트 */}
                {activeTab === "followers" && (
                  <FollowerList
                    followers={filteredFollowers}
                    handleUserClick={handleUserClick}
                    handleFollow={handleFollow}
                    isFollowingUser={isFollowingUser}
                  />
                )}

                {/* 팔로잉 리스트 */}
                {activeTab === "following" && (
                  <FollowingList
                    following={filteredFollowing}
                    handleUserClick={handleUserClick}
                    handleUnfollow={handleUnfollow}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 팔로워 리스트 컴포넌트
const FollowerList = ({ followers, handleUserClick, handleFollow, isFollowingUser }) => (
  <ul>
    {followers.map((user) => (
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
          style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
        />
        {user.fullName}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isFollowingUser(user.userId)) {
              // 이미 팔로우 중이라면 버튼을 비활성화
              toast.info("Already following this user.");
            } else {
              handleFollow(user.userId); // 팔로우 실행
            }
          }}
          style={{
            marginLeft: "auto",
            backgroundColor: isFollowingUser(user.userId) ? "#002050" : "#0066ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          {isFollowingUser(user.userId) ? "Unfollow" : "Follow"}
        </button>
      </li>
    ))}
  </ul>
);

// 팔로잉 리스트 컴포넌트
const FollowingList = ({ following, handleUserClick, handleUnfollow }) => (
  <ul>
    {following.map((user) => (
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
          style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
        />
        {user.fullName}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUnfollow(user._id, user.userId); // 언팔로우 실행
          }}
          style={{
            marginLeft: "auto",
            backgroundColor: "#002050",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          Unfollow
        </button>
      </li>
    ))}
  </ul>
);

export default FollowListModal;
