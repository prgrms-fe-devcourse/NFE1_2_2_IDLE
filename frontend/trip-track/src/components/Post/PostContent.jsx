import { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './PostContent.css';

// PostContent 컴포넌트
const PostContent = ({ dailyLocations }) => {
    // 상태로 현재 선택된 날짜와 장소 추적
    const [currentDayIndex, setCurrentDayIndex] = useState(0); // 현재 날짜 인덱스
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0); // 현재 장소 인덱스

    // 현재 날짜의 장소 목록 가져오기
    const currentDay = dailyLocations[currentDayIndex];
    const currentLocations = currentDay.locations;

    const handleLocationPageClick = (index) => {
        setCurrentLocationIndex(index);
    };

    const handleDayChange = (direction) => {
        setCurrentDayIndex((prevDayIndex) => prevDayIndex + direction);
        setCurrentLocationIndex(0); // 날짜가 변경되면 첫 번째 장소로 리셋
    };

    const currentLocation = currentLocations[currentLocationIndex];

    const { name = '', title = '', photos = [], description = '' } = currentLocation;

    return (
        <div className="post-content">
            {/* 날짜 제목 */}
            <h2>{`방문 날짜: ${currentDay.date}`}</h2>

            {/* 장소명 + 장소별 제목 */}
            <h2>{name}</h2>
            <h3>{title}</h3>

            {/* 사진 슬라이드 */}
            {photos.length > 0 && (
                <Splide options={{ type: 'loop', perPage: 1, autoplay: true, pagination: false }}>
                    {photos.map((photo, index) => (
                        <SplideSlide key={index}>
                            <img src={photo} alt={`slide-${index}`} />
                        </SplideSlide>
                    ))}
                </Splide>
            )}

            {/* 텍스트 내용 */}
            <p>{description.slice(0, photos.length > 0 ? 500 : 1000)}</p>

            {/* 날짜 변경 버튼 */}
            <div className="day-navigation">
                <button onClick={() => handleDayChange(-1)} disabled={currentDayIndex === 0}>
                    {'<<'}
                </button>
                <button onClick={() => handleDayChange(1)} disabled={currentDayIndex === dailyLocations.length - 1}>
                    {'>>'}
                </button>
            </div>

            {/* 페이지네이션: 하루에 방문한 장소들만 표시 */}
            <div className="pagination">
                <button
                    onClick={() => handleLocationPageClick(currentLocationIndex - 1)}
                    disabled={currentLocationIndex === 0}
                >
                    {'<'}
                </button>
                {currentLocations.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleLocationPageClick(index)}
                        className={index === currentLocationIndex ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handleLocationPageClick(currentLocationIndex + 1)}
                    disabled={currentLocationIndex === currentLocations.length - 1}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default PostContent;
