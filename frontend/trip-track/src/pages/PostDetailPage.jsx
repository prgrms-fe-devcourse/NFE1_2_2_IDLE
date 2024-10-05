import './PostDetailPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostHeader from '../components/Post/PostHeader.jsx';
import PostContent from '../components/Post/PostContent.jsx';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [selectedDay, setSelectedDay] = useState(0); // 현재 선택된 날짜
    const [selectedLocation, setSelectedLocation] = useState(0); // 현재 선택된 장소

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post', error);
            }
        };
        fetchPost();
    }, [postId]);

    const handlePrevDay = () => {
        if (selectedDay > 0) {
            setSelectedDay(selectedDay - 1);
        }
    };

    const handleNextDay = () => {
        if (selectedDay < post?.tripData.dailyLocations.length - 1) {
            setSelectedDay(selectedDay + 1);
        }
    };

    const handlePrevLocation = () => {
        if (selectedLocation > 0) {
            setSelectedLocation(selectedLocation - 1);
        }
    };

    const handleNextLocation = () => {
        if (selectedLocation < post?.tripData.dailyLocations[selectedDay].locations.length - 1) {
            setSelectedLocation(selectedLocation + 1);
        }
    };

    return (
        <div>
            {post && (
                <>
                    <PostHeader post={post} />
                    <div className="post-map">
                        {/* 지도와 경로 표시 기능 추가 필요 */}
                        <div className="navigation-buttons">
                            <button onClick={handlePrevDay} disabled={selectedDay === 0}>
                                &lt; The day before
                            </button>
                            <button onClick={handleNextDay} disabled={selectedDay === post.tripData.dailyLocations.length - 1}>
                                The day after &gt;
                            </button>
                        </div>
                        <div className="place-navigation">
                            <button onClick={handlePrevLocation} disabled={selectedLocation === 0}>
                                &lt;
                            </button>
                            <span>{selectedLocation + 1} / {post.tripData.dailyLocations[selectedDay].locations.length}</span>
                            <button onClick={handleNextLocation} disabled={selectedLocation === post.tripData.dailyLocations[selectedDay].locations.length - 1}>
                                &gt;
                            </button>
                        </div>
                    </div>
                    <PostContent
                        location={post.tripData.dailyLocations[selectedDay].locations[selectedLocation]}
                        postId={post._id}
                    />
                </>
            )}
        </div>
    );
};

export default PostDetailPage;
