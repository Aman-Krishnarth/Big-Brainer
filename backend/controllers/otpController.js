const { sendMail } = require("../utils/nodemailerUtil.js");
const { setOtp } = require("../utils/otpUtil.js");

const sendOtp = async (req, res) => {
    // assuming we get the email in the request body

    try {
        const { email } = req.body;

        console.log("send otp mein aa gaya");

        // sabse pehle set kardo otp ko

        setOtp(email);

        console.log("otp set ho gaya bro")

        // ab bhej do otp using the sendMail function

        await sendMail(email);

        return res.status(200).json({
            status: true,
            message: "Otp sent for verification",
        })

    } catch (error) {

        console.log('error aaya hai in send otp')
        console.log(error)

        return res.status(500).json({
            status: false,
            message: "Error sending OTP",
        });
    }
};

module.exports = { sendOtp };
