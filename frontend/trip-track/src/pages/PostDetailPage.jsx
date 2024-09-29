import PostComment from '../components/Post/PostComment';

const PostDetailPage = () => {
  return (
    <div>
      {/* 다른 포스트 관련 정보 표시 */}
      <PostComment initialCommentCount={5} />
    </div>
  );
};

export default PostDetailPage;
