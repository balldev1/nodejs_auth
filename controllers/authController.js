const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// สร้าง JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email นี้ถูกใช้ไปแล้ว" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "ไม่พบผู้ใช้งาน" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });

    const token = generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: false, // ❌ ปิด secure เพราะ localhost ใช้ HTTP
      // sameSite: "Lax", // ✅ อนุญาตให้ส่ง Cookie ข้าม Domain ได้ (แต่ต้องอยู่ในเครือข่ายเดียวกัน)
      secure: process.env.NODE_ENV === "production", // ใช้ secure mode ใน production
      maxAge: 3600000, // 1 ชม.
    });

    res.json({ message: "เข้าสู่ระบบสำเร็จ" });

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      jwt: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "ออกจากระบบสำเร็จ" });
};
