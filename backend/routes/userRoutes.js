const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 사용자 목록 조회
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 사용자 생성 (POST)
router.post('/', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: '모든 필드를 채워주세요.' });
    }
    try {
        const newUser = new User({ fullName, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: '서버 에러' });
    }
});

module.exports = router;
