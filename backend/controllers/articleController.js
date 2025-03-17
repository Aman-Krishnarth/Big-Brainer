const User = require("../models/User/User.js");
const Article = require("../models/Article/Article.js");
const jwt = require("jsonwebtoken");

const createArticle = async (req, res) => {
    try {
        const { title, excerpt, content, tags } = req.body;

        // Check if token exists
        if (!req.cookies.token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized. No token provided.",
            });
        }

        // Verify token
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        // Fetch the user
        const user = await User.findById(data.id);
        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User not found." });
        }

        // Create the article
        const newArticle = await Article.create({
            title,
            excerpt,
            content,
            tags,
            author: user._id,
        });

        return res.status(201).json({
            status: true,
            message: "Article created successfully!",
            article: newArticle,
        });
    } catch (error) {
        console.error("Error creating article:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong. Try again later.",
        });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find(
            {},
            {
                content: 0,
                updatedAt: 0,
            }
        );

        return res.status(200).json({
            status: true,
            message: "Articles fetched successfully",
            articles,
        });
    } catch (error) {
        console.log("GET ALL ARTICLES CATCH");
        return res.json(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

const getSpecificArticle = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized. No token provided.",
            });
        }

        // Verify token
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        // Fetch the user
        const user = await User.findById(data.id);
        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User not found." });
        }

        console.log(user.liked);

        const articleId = req.params.id;

        const article = await Article.findOne({ _id: articleId });

        article.liked = user.liked.includes(articleId) ? true : false;

        await article.save();

        return res.status(200).json({
            status: true,
            message: "Article fetched successfully",
            article,
        });
    } catch (error) {
        console.log("GET SPECIFIC ARTICLE CATCH");

        console.log(error);

        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

const likeArticle = async (req, res) => {
    try {
        // Check if token exists
        if (!req.cookies.token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized. No token provided.",
            });
        }

        // Verify token
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        // Fetch the user
        const user = await User.findById(data.id);
        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User not found." });
        }

        const articleId = req.params.id;

        const article = await Article.findById(articleId);

        user.liked.push(article._id);
        article.likes++;

        await user.save();
        await article.save();

        return res.status(200).json({
            status: true,
            message: "Article liked successfully",
        });
    } catch (error) {
        console.log("GET SPECIFIC ARTICLE CATCH");

        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

const filterArticle = async (req, res) => {
    try {
        const filterTags = req.query.tags; 

        if (!filterTags || !Array.isArray(filterTags)) {
            return res.json({
                status: false,
                message: "No articles found"
            })
        }

        // Use case-insensitive regex to match tags in the database
        const articles = await Article.find({
            tags: {
                $in: filterTags.map((tag) => new RegExp(`^${tag}$`, "i")), // Create a case-insensitive regex for each tag
            },
        });

        // Check if articles are found
        if (articles.length === 0) {
            return res.json({
                status: false,
                message: "No articles found"
            })
        }

        // Return the filtered articles
        res.status(200).json({
            status: true,
            message: "Articles fetched successfully",
            articles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching articles" });
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getSpecificArticle,
    likeArticle,
    filterArticle,
};
