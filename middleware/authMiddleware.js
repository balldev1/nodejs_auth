const jwt = require("jsonwebtoken");
require("dotenv").config(); // โหลดตัวแปรจาก .env

// Middleware สำหรับตรวจสอบ JWT
const checkJwt = (req, res, next) => {
  const token = req.cookies["token"]; // ใช้ชื่อ Cookie ที่คุณตั้งไว้
  console.log(token);
  if (!token) {
    console.log("No token provided"); // Log เมื่อไม่มี token
    return res.status(401).json({ message: "Authentication required" });
  }

  // Log ข้อมูลของ token ก่อนการ verify
  console.log("Token received:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token:", err); // Log เมื่อเกิด error ในการ verify token
      return res.status(401).json({ message: "Invalid token" });
    }

    // Log ข้อมูล decoded ของ token
    console.log("Decoded token:", decoded);

    req.user = decoded; // นำข้อมูลของ user ที่ decode จาก token มาเก็บใน request
    next();
  });
};

module.exports = checkJwt;
