const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// นำเข้าฟังก์ชันจาก controller
const { createPost, getPosts } = require("../controllers/programmerController");

// ตั้งค่า Multer สำหรับการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ที่ไม่ซ้ำกัน
  },
});

const upload = multer({ storage });

// เส้นทางสำหรับสร้างโพสต์
router.post("/", upload.single("image"), createPost);
router.get("/", getPosts);

module.exports = router;
