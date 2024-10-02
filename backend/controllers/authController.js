const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 이메일 중복 체크
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
    }

    // 새로운 사용자 생성
    const user = new User({ fullName, email, password });
    await user.save();

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    // 중복 키 에러 처리
    if (error.code === 11000) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }
    res
      .status(500)
      .json({ message: "회원가입 중 오류가 발생했습니다.", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 조회
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // 비밀번호 검증
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다.", error });
  }
};

module.exports = { register, login };
