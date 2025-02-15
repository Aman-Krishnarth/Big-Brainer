const otps = {};

const generateOTP = () => {
    const otp = "";
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};

const setOtp = (email) => {
    otps[email] = generateOTP();
    const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

    setTimeout(() => {
        delete otps[email];
    }, OTP_EXPIRATION_TIME);
    return otps[email];
};

const getOtp = (email) => {
    return otps[email];
};

module.exports = { setOtp, getOtp };
