const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./models/connectDB.js');
const authRouter = require('./routes/authRouter.js');
const otpRouter = require('./routes/otpRouter.js');
const feedbackRouter = require("./routes/feedbackRouter.js")

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  // Only allow requests from this origin
  credentials: true,  // Allow cookies to be sent with requests
}));

app.get('/', (req, res) => {
  res.send('SERVER STARTED');
});

// auth router
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/feedback", feedbackRouter)

app.listen(process.env.PORT, () => {
    connectDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});