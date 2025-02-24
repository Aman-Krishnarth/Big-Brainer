const express = require("express");
const {
    createArticle,
    getAllArticles,
    getSpecificArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getSpecificArticle);

module.exports = router;
