// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

// 라우트 설정
app.use("/api", authRoutes);

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB에 연결되었습니다."))
  .catch((err) => console.error("MongoDB 연결 오류:", err));

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
