const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./models/connectDB.js');
const authRouter = require('./routes/authRouter.js');

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('SERVER STARTED');
});

// auth router
app.get('/api/v1/auth', authRouter);

app.listen(process.env.PORT, () => {
    connectDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});