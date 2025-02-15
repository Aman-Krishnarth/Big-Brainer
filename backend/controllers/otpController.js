const { sendMail } = require("../utils/nodemailerUtil.js");

const sendOtp = async (req, res) => {
    // assuming we get the email in the request body

    try {
        const { email } = req.body;

        await sendMail(email);
    } catch (error) {}
};

module.exports = { sendOtp };
