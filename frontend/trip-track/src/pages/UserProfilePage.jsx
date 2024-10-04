import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../recoil/atom";
import { getUser, followUser, unfollowUser } from "../services/authService";
import UserInfo from "../components/Profile/UserProfile";
import PostHeader from "../components/Common/PostHeader";
import PostList from "../components/Post/PostList";
import FollowListModal from "../components/Common/FollowListModal";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("My Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserData = async () => {
    try {
      const user = await getUser(userId);

      const followers = user.followers || [];
      const following = user.following || [];

      setUserData({ ...user, followers, following });

      if (currentUser && currentUser.following) {
        setIsFollowing(
          currentUser.following.some((follow) => follow.user === userId)
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    setActiveTab("My Posts");
  }, [userId, currentUser]);

  const handleFollow = async () => {
    if (!currentUser) {
      console.warn("User not logged in");
      navigate("/login");
      return;
    }

    try {
      if (isFollowing) {
        const followRelation = currentUser.following.find(
          (follow) => follow.user === userId
        );
        if (followRelation) {
          await unfollowUser(followRelation._id);
          setIsFollowing(false);

          setUserData((prevData) => ({
            ...prevData,
            followers: prevData.followers.filter(
              (follower) => follower.follower !== currentUser._id
            ),
          }));

          setCurrentUser((prevUser) => ({
            ...prevUser,
            following: prevUser.following.filter(
              (follow) => follow._id !== followRelation._id
            ),
          }));
        }
      } else {
        const newFollow = await followUser(userId);
        setIsFollowing(true);

        setUserData((prevData) => ({
          ...prevData,
          followers: [...prevData.followers, { follower: currentUser._id }],
        }));

        setCurrentUser((prevUser) => ({
          ...prevUser,
          following: [...prevUser.following, newFollow],
        }));
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
    }
  };

  const handleFilterChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {userData && (
        <div className="container mt-4">
          <UserInfo
            userData={userData}
            isCurrentUser={currentUser ? currentUser._id === userId : false}
            onEditProfile={() => navigate("/EditProfile")}
            onFollow={handleFollow}
            isFollowing={isFollowing}
            isLoggedIn={!!currentUser}
          />
          <PostHeader
            isCurrentUser={currentUser ? currentUser._id === userId : false}
            onFilterChange={handleFilterChange}
            activeTab={activeTab}
            onSearch={handleSearch}
          />
          <PostList
            userId={userId}
            filter={activeTab}
            searchQuery={searchQuery}
          />

          <FollowListModal
            followers={userData.followers}
            following={userData.following}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
