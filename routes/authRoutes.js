const express = require("express");
const {
  register,
  login,
  logout,
  profile,
} = require("../controllers/authController");

const protect = require("../middleware/protect"); // นำเข้า protect middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Route ที่ต้องการการตรวจสอบ JWT ก่อนเข้าถึง (ใช้ protect middleware)
router.get("/profile", protect, profile); // ใช้ protect middleware ก่อนให้เข้าถึงโปรไฟล์

module.exports = router;
