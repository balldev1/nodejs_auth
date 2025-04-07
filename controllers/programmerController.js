const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const Programmer = require("../models/Programmer");

// ฟังก์ชันสำหรับดึงโพสต์ทั้งหมด
const getPosts = async (req, res) => {
  try {
    // ดึงข้อมูลทั้งหมดจาก collection Programmer
    const posts = await Programmer.find();

    // ส่งข้อมูลกลับ
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ฟังก์ชันสำหรับสร้างโพสต์ใหม่
const createPost = async (req, res) => {
  try {
    const { header, content } = req.body;
    let imagePath = null;

    // หากมีการอัปโหลดไฟล์ภาพ
    if (req.file) {
      const originalImagePath = path.join(
        __dirname,
        "../public",
        req.file.filename
      ); // Path ของไฟล์ภาพที่อัปโหลด

      // กำหนดเส้นทางการบันทึกไฟล์ที่แปลงเป็น .webp ในไดเรกทอรี Programmer
      imagePath = `/programmer/${req.file.filename.replace(
        path.extname(req.file.filename),
        ".webp"
      )}`;

      // กำหนดเส้นทางสำหรับไฟล์ที่แปลงแล้ว
      const outputImagePath = path.join(__dirname, "../public", imagePath);

      // ใช้ sharp เพื่อแปลงภาพเป็น .webp
      await sharp(originalImagePath)
        .webp() // แปลงเป็น .webp
        .toFile(outputImagePath); // บันทึกไฟล์ .webp ในไดเรกทอรี Programmer

      // ลบไฟล์ต้นฉบับหลังจากแปลงแล้ว
      fs.unlinkSync(originalImagePath);
    }

    // สร้าง Document ใหม่ใน MongoDB
    const newPost = new Programmer({
      header,
      content,
      image: imagePath, // เก็บ path ของภาพที่แปลงแล้ว
    });

    // บันทึกข้อมูลลงใน MongoDB
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getPosts, createPost };
