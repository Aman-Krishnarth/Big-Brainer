const { signupWithGoogle, loginWithGoogle } = require("../controllers/googleAuthController");
const { validateGoogleSignup, validateGoogleLogin } = require("../middlewares/googleAuthMiddleware");

const router = require("express").Router();

router.post("/signup", validateGoogleSignup, signupWithGoogle);
router.post("/login", validateGoogleLogin, loginWithGoogle);



module.exports = router;
