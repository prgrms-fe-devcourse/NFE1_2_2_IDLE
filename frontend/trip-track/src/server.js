const express = require('express');
const app = express();
app.use(express.json());

// 사용자 회원가입
app.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const newUser = new User({ fullName, email, password });
        await newUser.save();
        res.status(201).json({ message: "회원가입 완료" });
    } catch (error) {
        res.status(400).json({ message: "회원가입 실패", error });
    }
});

// 사용자 로그인
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: "로그인 성공" });
        } else {
            res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});

// 특정 사용자 정보 불러오기
app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await user.findById(userId);
        if (user) {
            res.status(200).json({ fullName: user.fullName, email: user.email, image: user.image });
        } else {
            res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});

// 나의 정보를 변경
app.put('/settings/update-user', async (req, res) => {
    const userId = req.userId;
    const { fullName, email } = req.body;

    try {
        const user = await user.findByIdAndUpdate(userId, { fullName, email }, { new: true });
        if (user) {
            res.status(200).json({ message: "사용자 정보가 성공적으로 업데이트되었습니다." });
        } else {
            res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(400).json({ message: "업데이트 실패", error });
    }
});

// 내 계정 비밀번호 변경
app.put('/settings/update-password', async (req, res) => {
    const userId = req.userId; 
    const { password, newPassword } = req.body;

    try {
        const user = await user.findById(userId);
        if (user && user.password === password) {
            user.password = newPassword; 
            await user.save();
            res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
        } else {
            res.status(401).json({ message: "잘못된 비밀번호입니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});


// 서버 실행
const PORT = 7700;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
