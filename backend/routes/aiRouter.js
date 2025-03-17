const express = require("express");
const {askAi} = require('../controllers/aiController.js')

const router = express.Router();
router.get("/:prompt", askAi);

module.exports = router;
