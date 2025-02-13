const express = require('express');
const { validateLogin, validateSignup } = require('../middlewares/authMiddleware');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/signup", validateSignup, signup);

module.exports = router;