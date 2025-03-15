const cron = require("node-cron");
const Article = require("../models/Article/Article.js");
const User = require("../models/User/User.js");
const { sendArticle } = require("../utils/nodemailerUtil.js");

// Define your task that should run at 8 AM IST
const task = async () => {
    
    console.log("inside tasks")
    const articles = await Article.find({});
    const users = await User.find({});

    const todaysArticle = articles[Math.floor(Math.random() * articles.length)];

    for (let i = 0; i < users.length; i++) {
        sendArticle(users[i].email, todaysArticle.title, todaysArticle.excerpt);
    }
};

// Schedule the cron job to run at 8 AM IST every day
cron.schedule("0 8 * * *", task, {
    timezone: "Asia/Kolkata", // Set the timezone to IST
});

console.log("Cron job scheduled to run at 8 AM IST every day");
