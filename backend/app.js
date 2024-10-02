const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 환경 변수 설정
dotenv.config();

// MongoDB 연결
connectDB();

// Express 서버 설정
const app = express();
app.use(cors());
app.use(express.json());

// 라우팅 예시
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
