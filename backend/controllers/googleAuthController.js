const User = require("../models/User/User.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const signupWithGoogle = async (req, res) => {
    try {
        console.log(req.user);

        const { email, name } = req.user;

        const user = await User.create({
            email,
            username: name,
            password: "GOOGLE_AUTH",
        });

        return res.status(200).json({
            status: true,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

const loginWithGoogle = async (req, res) => {
    try {
        const { user } = req.user;

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Uncomment for production environment
            sameSite: "Strict", // Helps protect against CSRF
            maxAge: 3600000, // Token expires after 1 hour
        });

        const retUser = {
            id: user._id,
            username: user.username,
        };

        return res.json({
            status: true,
            message: "Logged in successfully",
            retUser,
        });
    } catch (error) {
        console.log("LOGIN CATCH", error);
        return res.json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    signupWithGoogle,
    loginWithGoogle,
};
