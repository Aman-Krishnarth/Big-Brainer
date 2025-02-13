const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
                console.log("DB CONNECTED SUCCESSFULLY");
            })
            .catch((err) => {
                console.log(err);
                console.log("DB CONNECTION FAILED");
            });
    } catch (error) {
        console.log("DB CONNECTION CATCH ");
    }
};

module.exports = connectDB;
