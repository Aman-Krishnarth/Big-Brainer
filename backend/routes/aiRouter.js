const express = require("express");
const { askAi } = require("../controllers/AiController");

const router = express.Router();
router.get("/:prompt", askAi);

module.exports = router;
