import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // 비밀번호 일치 여부 확인
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // 회원가입 요청을 보냅니다.
            const response = await axios.post('http://localhost:5000/api/register', {
                fullName,
                email,
                password
            });
            setMessage(response.data.message);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="form-container">
            <h3>회원가입</h3>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default SignUp;
