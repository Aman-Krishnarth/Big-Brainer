const User = require("../models/User/User.js");
const jwt = require("jsonwebtoken");
const { emailFeedback } = require("../utils/nodemailerUtil.js");

const sendFeedback = async (req, res) => {
    try {
        const { content, subject } = req.body;

        const token = req.cookies.token;

        console.log("feedback waala token", token);
        console.log("key = ", process.env.JWT_SECRET);

        const data = jwt.verify(token, process.env.JWT_SECRET);

        console.log("data = ", data);

        const user = await User.findOne({ _id: data.id });

        await emailFeedback(user.email, subject, content);

        return res.json({
            status: true,
            message: "Feedback sent successfully",
        });
    } catch (error) {
        console.log("SEND FEEDBACK CATCH");
        console.log(error);
        return res.json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    sendFeedback,
};
