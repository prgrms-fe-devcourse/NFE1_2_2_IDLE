import React from 'react';

const UserProfilePage = () => {
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