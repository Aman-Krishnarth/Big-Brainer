const express = require("express");
const {
    createArticle,
    getAllArticles,
    getSpecificArticle,
    likeArticle,
    filterArticle,
} = require("../controllers/articleController");
const { validateArticle } = require("../middlewares/articleMiddleware.js");

const router = express.Router();

router.post("/", validateArticle,createArticle);
router.get("/", getAllArticles);
router.get("/filter", filterArticle)
router.get("/view/:id", getSpecificArticle);
router.get("/like/:id", likeArticle);

module.exports = router;
