const express = require("express");
const router = express.Router();

// นำเข้าฟังก์ชันจาก controller
const { getCurrency } = require("../controllers/currencyController").default;

// เส้นทางสำหรับสร้างโพสต์
router.get("/", getCurrency);

module.exports = router;
