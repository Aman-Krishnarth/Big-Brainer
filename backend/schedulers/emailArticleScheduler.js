const cron = require("node-cron");
const Article = require("../models/Article/Article.js");
const User = require("../models/User/User.js");
const { sendArticle } = require("../utils/nodemailerUtil.js");

// Define your task that should run at 8 AM IST
const task = async () => {
    try {
        console.log("inside tasks");

        // Fetch a random article from the database
        const randomArticle = await Article.aggregate([
            { $sample: { size: 1 } },
        ]);

        if (randomArticle.length === 0) {
            console.log("No articles found in the database.");
            return;
        }

        const todaysArticle = randomArticle[0]; // Extract the article from the array
        const users = await User.find({});

        for (let i = 0; i < users.length; i++) {
            await sendArticle(
                users[i].email,
                todaysArticle.title,
                todaysArticle.excerpt
            );
        }
    } catch (error) {
        console.error("Error executing cron job:", error);
    }
};

// Schedule the cron job to run at 8 AM IST every day
cron.schedule("0 8 * * *", task, {
    timezone: "Asia/Kolkata", // Set the timezone to IST
});

console.log("Cron job scheduled to run at 8AM IST every day");
