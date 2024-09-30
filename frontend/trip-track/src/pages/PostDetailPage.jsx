import PostComment from '../components/Post/PostComment';
import PostLike from '../components/Post/PostLike';

const PostDetailPage = () => {
  return (
    <div>
      {/* 다른 포스트 관련 정보 표시 */}
      <PostComment initialCommentCount={5} />
      <PostLike postId="12345" initialLikeCount={10} />
    </div>
  );
};

export default PostDetailPage;
