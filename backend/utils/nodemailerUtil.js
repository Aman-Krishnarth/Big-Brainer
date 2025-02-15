const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP settings
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
    },
});

const sendMail = async (email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendMail };
