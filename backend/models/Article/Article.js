const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        excerpt: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: [String], // Array of paragraphs
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: {
            type: Number,
            default: 0,
        },
        liked: {
            type: Boolean
        }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Article", articleSchema);
