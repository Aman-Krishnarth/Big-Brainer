const { signupWithGoogle } = require("../controllers/googleAuthController");

const router = require("express").Router();

router.get("/signup", signupWithGoogle);

module.exports = router;
