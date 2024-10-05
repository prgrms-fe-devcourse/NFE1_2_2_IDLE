import { useEffect, useState } from 'react';
import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import SearchBar from "../components/Common/SearchBar";
import PostCardGrid from '../components/Post/PostCardGrid';
import axios from 'axios';

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState('trending'); // 기본 필터는 트렌딩

    // API 호출 함수
    const fetchPosts = async (filter, page) => {
        try {
            const response = await axios.get('/posts', {
                params: { filter, page },
            });
            if (response.data.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...response.data]);
            } else {
                setHasMore(false); // 더 이상 로드할 것이 없을 경우
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    // 페이지가 로드될 때 또는 필터나 페이지가 변경될 때 포스트를 불러옴
    useEffect(() => {
        fetchPosts(filter, page);
    }, [filter, page]);

    // 무한 스크롤을 위해 페이지 번호 증가
    const loadMorePosts = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <Header />
            <SearchBar setFilter={setFilter} />
            <PostCardGrid posts={posts} loadMorePosts={loadMorePosts} hasMore={hasMore} />
            {!hasMore && <Footer />}
        </div>
    );
};

export default MainPage;