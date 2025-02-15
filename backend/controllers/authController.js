const User = require("../models/User/User.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.create({ email, password });

        return res.status(200).json({
            status: true,
            message: "User created successfully",
            user: user,
        });


    } catch (error) {
        if (error.code === 11000) {
            // MongoDB error message looks like: "email_1 dup key: { email: \"skdjlfsd@gmail.com\" }"
            const duplicateKeyField = Object.keys(error.keyValue)[0]; // Extract the field (email in this case)

            return res.status(400).json({
                status: false,
                message: `${
                    duplicateKeyField.charAt(0).toUpperCase() +
                    duplicateKeyField.slice(1)
                } is already taken`,
            });
        }

        // Handle other errors (like server errors)
        return res.status(500).json({
            status: false,
            message: "Something went wrong, please try again",
        });
    }
};

const login = async (req, res) => {

    
    // const token = generateToken(user._id);

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === 'production', // This will be true only in production
    //     sameSite: "Strict", // Helps protect against CSRF
    //     maxAge: 3600000, // Token expires after 1 hour
    // });

};

module.exports = {
    login,
    signup,
};
