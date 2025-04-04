const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", require("./routes/authRoutes"));
// สำหรับการเข้าถึงไฟล์อัปโหลด
// app.use("/uploads", express.static(path.join(__dirname, "public")));
// เส้นทางสำหรับ API
app.use("/network", express.static(path.join(__dirname, "public", "network")));

app.use("/api/auth/network", require("./routes/networkRoute"));

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
