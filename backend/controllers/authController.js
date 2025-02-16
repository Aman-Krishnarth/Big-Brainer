const User = require("../models/User/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        bcrypt.hash(password,10,async (err, hash)=>{
            if(err){
                console.log("SIGNUP BCRYPT ERR");
                return res.json({
                    status: false,
                    message: "Something went wrong"
                })
            }
            const user = await User.create({ email, password:hash });
        })


        return res.status(200).json({
            status: true,
            message: "User created successfully",
            // user: user,
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
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: false,
                message: "User not found",
            });
        }

        // Use await to ensure bcrypt compare finishes before proceeding
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = generateToken(user._id);

            res.cookie("token", token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production', // Uncomment for production environment
                sameSite: "Strict", // Helps protect against CSRF
                maxAge: 3600000, // Token expires after 1 hour
            });

            return res.json({
                status: true,
                message: "Logged in successfully",
            });
        } else {
            return res.json({
                status: false,
                message: "Incorrect credentials",
            });
        }
    } catch (error) {
        console.log("LOGIN CATCH", error);
        return res.json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    login,
    signup,
};
