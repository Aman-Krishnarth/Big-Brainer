const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./models/connectDB.js");
const authRouter = require("./routes/authRouter.js");
const otpRouter = require("./routes/otpRouter.js");
const feedbackRouter = require("./routes/feedbackRouter.js");
const articleRouter = require("./routes/articleRouter.js");
const aiRouter = require("./routes/aiRouter.js");
const googleAuthRouter = require("./routes/googleAuthRouter.js");
const cookieParser = require("cookie-parser");
require("./schedulers/emailArticleScheduler.js")

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "https://big-brainer-frontend.onrender.com", // Only allow requests from this origin
        credentials: true, // Allow cookies to be sent with requests
    })
);

app.get("/", (req, res) => {
    res.send("SERVER STARTED");
});

// auth router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/askAi", aiRouter);
app.use("/api/v1/googleAuth", googleAuthRouter);

app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});
