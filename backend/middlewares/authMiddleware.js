const Joi = require("joi");
const { getOtp } = require("../utils/otpUtil");

const validateLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Define Joi validation schema
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                "string.base": `"email" should be a type of 'text'`,
                "string.email": `"email" must be a valid email`,
                "any.required": `"email" is a required field`,
            }),
            password: Joi.string().min(6).required().messages({
                "string.base": `"password" should be a type of 'text'`,
                "string.min": `"password" should have a minimum length of {#limit}`,
                "any.required": `"password" is a required field`,
            }),
        });

        // Validate request body against the schema
        await schema.validateAsync({ email, password });

        // check if user already exists

        // If validation is successful, move to next middleware
        next();
    } catch (error) {
        // Handle validation error and send the custom message to the frontend
        return res.status(400).json({
            success: false,
            message: error.details[0].message, // This will send the custom error message
        });
    }
};

const validateSignup = async (req, res, next) => {
    try {
        const { email, password, otp } = req.body;

        // Define Joi validation schema
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                "string.base": `"email" should be a type of 'text'`,
                "string.email": `"email" must be a valid email`,
                "any.required": `"email" is a required field`,
            }),
            password: Joi.string().min(6).required().messages({
                "string.base": `"password" should be a type of 'text'`,
                "string.min": `"password" should have a minimum length of {#limit}`,
                "any.required": `"password" is a required field`,
            }),
        });

        // Validate request body against the schema
        await schema.validateAsync({ email, password });

        // verify otp

        if (otp !== getOtp(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // If validation is successful, move to next middleware
        next();
    } catch (error) {
        // Handle validation error and send the custom message to the frontend
        return res.status(400).json({
            success: false,
            message: error.details[0].message, // This will send the custom error message
        });
    }
};

module.exports = {
    validateLogin,
    validateSignup,
};
