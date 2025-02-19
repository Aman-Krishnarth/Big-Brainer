const express = require("express");
const {
    validateLogin,
    validateSignup,
} = require("../middlewares/authMiddleware");
const { login, signup, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/signup", validateSignup, signup);
router.post("/logout", logout);

module.exports = router;
