const express = require("express");
const { validateFeedback } = require("../middlewares/feedbackMiddleware");
const { sendFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", validateFeedback, sendFeedback);

module.exports = router;
