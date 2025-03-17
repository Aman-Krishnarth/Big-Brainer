const express = require("express");
const {
    createArticle,
    getAllArticles,
    getSpecificArticle,
    likeArticle,
    filterArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/filter", filterArticle)
router.get("/view/:id", getSpecificArticle);
router.get("/like/:id", likeArticle);

module.exports = router;
