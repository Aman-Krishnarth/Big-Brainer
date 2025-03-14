const { oauth2Client } = require("../utils/googleAuthUtil");
const axios = require("axios");
const User = require("../models/User/User.js")

const validateGoogleSignup = async (req, res, next) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        console.log(googleRes);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        console.log("USER AA GAYA GOOGLE SE");
        console.log(userRes);

        const { email, name } = userRes.data;

        // check if already exists
        const user = await User.findOne({email})

        if(user){
            return res.json({
                status: false,
                message: "User already exists"
            })
        }

        req.user = {
            email,
            name,
        };

        next();
    } catch (error) {

        return res.json({
            status: false,
            message: "Something went wrong"
        })

    }
};

const validateGoogleLogin = async (req, res, next) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        console.log(googleRes);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email } = userRes.data;

        // check if user exists
        const user = await User.findOne({email})

        if(!user || user.password !== "GOOGLE_AUTH"){
            return res.json({
                status: false,
                message: "User not found"
            })
        }

        req.user = {
            user
        };

        next();
    } catch (error) {

        return res.json({
            status: false,
            message: "Something went wrong"
        })

    }
};

module.exports = {
    validateGoogleSignup,
    validateGoogleLogin
};
