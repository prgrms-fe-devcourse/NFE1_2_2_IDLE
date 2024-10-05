import PostCard from './PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostCardGrid = ({ posts, loadMorePosts, hasMore }) => {
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more posts to show</p>}
        >
            <div className="post-card-grid">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default PostCardGrid;
