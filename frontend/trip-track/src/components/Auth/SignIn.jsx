import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      setMessage(response.data.message); // 로그인 성공 시 추가 처리 (예: 리다이렉트, 상태 저장 등)
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message); // 서버에서 받은 에러 메시지
        } else {
          setError('로그인 중 오류가 발생했습니다.');
        }
      }
    };

    return (
        <div>
            <h3>Trip Track과 함께<br/>
                여러분의 특별한 경험을<br/>
                많은 사람들과 공유하세요!
            </h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;