const { oauth2Client } = require("../utils/googleAuthUtil");
const axios = require("axios")

const signupWithGoogle = async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens)

        console.log(googleRes)

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        console.log("USER AA GAYA GOOGLE SE")
        console.log(userRes);

        const {email, name} = userRes.data;

        return res.status(200).json({
            status: true,
            message: "backend se data padhle dalle"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    signupWithGoogle,
};
