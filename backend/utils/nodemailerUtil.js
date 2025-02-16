const nodemailer = require("nodemailer");
const { getOtp } = require("./otpUtil");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP settings
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
    },
});

const sendMail = async (email) => {
    try {
        const otp = await getOtp(email);

        console.log("send mail mein otp = ", otp);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification for Your Signup at Big Brainer",
            html: `
                <h3>Below is your OTP for signing up at Big Brainer:</h3>
                <h1 style="font-size: 32px; font-weight: bold; color: #007BFF; text-align: center;">${otp}</h1>
                <h3>This OTP is valid for 5 minutes. Do not share it with anyone.</h3>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendMail };
