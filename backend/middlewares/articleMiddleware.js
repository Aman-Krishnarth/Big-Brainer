const validateArticle = (req, res, next) => {
    try {
        const { title, excerpt, content, tags } = req.body;

        if (
            !title ||
            title.length === 0 ||
            !excerpt ||
            excerpt.length === 0 ||
            !content ||
            content.length === 0 ||
            !tags ||
            tags.length === 0
        ) {
            return res.json({
                status: false,
                message: "Please provide all the required fields",
            });
        }

        next();
    } catch (error) {
        console.log("ARTICLE MIDDLEWARE ERROR");
        console.log(error);
        return res.json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    validateArticle,
};
