const express = require("express");
const {
  register,
  login,
  logout,
  profile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", protect, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
