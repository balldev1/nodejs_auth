const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "ไม่ได้รับอนุญาต" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token ไม่ถูกต้อง" });
  }
};

module.exports = protect;
