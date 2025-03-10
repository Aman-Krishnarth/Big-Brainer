const express = require("express");
const {
    createArticle,
    getAllArticles,
    getSpecificArticle,
    likeArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getSpecificArticle);
router.get("/like/:id", likeArticle);

module.exports = router;
