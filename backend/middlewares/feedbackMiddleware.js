const validateFeedback = async (req, res, next) => {

    try {
        const { subject, content } = req.body;

        if (
            !subject ||
            subject.length === 0 ||
            !content ||
            content.length === 0
        ) {
            return res.json({
                status: false,
                message: "Please fill the form correctly",
            });
        }

        next();
    } catch (error) {
        console.log("FEEDBACK MIDDLEWARE CATCH");
        return res.json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    validateFeedback,
};
