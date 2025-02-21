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

const emailFeedback = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: email, // The sender's email (using environment variable)
            to: process.env.EMAIL_USER, // Recipient's email (from the variable 'email')
            subject,
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #4CAF50; text-align: center;">Feedback Received</h2>
        <h3 style="color: #333; text-align: center;">Feedback from: <span style="font-weight: bold; color: #007BFF;">${email}</span></h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6; text-align: left;">
            ${content}
        </p>
    </div>
`,
        };

        await transporter.sendMail(mailOptions);

        console.log("EMAILED FEEDBACK SUCCESSFULLY");
    } catch (error) {
        console.log("EMAIL FEEDBACK CATCH");
    }
};

module.exports = { sendMail, emailFeedback };
