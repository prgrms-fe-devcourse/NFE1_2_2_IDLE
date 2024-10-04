import axios from 'axios';

const API_BASE_URL = 'https://kdt.frontend.5th.programmers.co.kr:5008';

// 인증 토큰 가져오기 함수 (예시로 로컬스토리지에서 가져오는 방식)
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// 특정 포스트 상세 보기
export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post details:', error);
        throw error;
    }
};

// 포스트 생성하기
export const createPost = async (postData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts/create`, postData, {
            headers: {
                Authorization: `Bearer ${token}`,  // 인증을 위한 JWT 토큰 필요
            },
        });
        return response.data; // 생성된 포스트 반환
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// 포스트 수정하기
export const updatePostById = async (postId, postData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/update`, {
            postId,
            ...postData
        }, {
            headers: {
                Authorization: `Bearer ${token}`,  // 인증을 위한 JWT 토큰 필요
            },
        });
        return response.data; // 업데이트된 포스트 반환
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// 포스트 삭제하기
export const deletePostById = async (postId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,  // 인증을 위한 JWT 토큰 필요
            },
            data: { id: postId }  // 삭제할 포스트 ID를 요청 바디에 포함
        });
        return response.data; // 삭제 결과 반환
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};


// 특정 포스트에 댓글 작성하기
export const createComment = async (postId, comment) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/comments/create`, {
            postId,
            comment
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

// 댓글 삭제하기
export const deleteComment = async (commentId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_BASE_URL}/comments/delete`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { id: commentId }  // 삭제할 댓글의 ID를 전송
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};