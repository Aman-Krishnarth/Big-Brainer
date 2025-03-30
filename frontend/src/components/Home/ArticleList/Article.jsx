import React from "react";
import TopicsSpan from "../TopicsSpan";
import { useNavigate } from "react-router-dom";

function Article({ article, number }) {
    const navigate = useNavigate();

    function formatDate(dateString) {
        const date = new Date(dateString); // Create a Date object from the string

        const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad it with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based) and pad it with leading zero if needed
        const year = date.getFullYear(); // Get the year

        return `${day}-${month}-${year}`; // Return the formatted date
    }

    function handleArticleClick() {
        navigate(`/home/article/${article._id}`);
    }

    return (
        <div
            className="bg-[#3A3A3A] hover:bg-[#4F4F4F] hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-3xl flex flex-col gap-4 my-4 shadow-lg hover:shadow-2xl transform"
            onClick={handleArticleClick}
        >
            {/* Title Section */}
            <h3 className="text-2xl font-bold text-white leading-tight">
                {number}. {article.title}
            </h3>

            {/* Date Section */}
            <h3 className="text-sm text-gray-300 italic">
                Published: {formatDate(article.createdAt)}
            </h3>

            {/* Excerpt Section */}
            <p className="text-lg text-gray-200 mt-2 tracking-wide">
                Preview: {article.excerpt}
            </p>

            {/* Topics Section */}
            <h3 className="text-md text-gray-300 mt-2">
                Topics:
                <span className="ml-2 space-x-3">
                    {article.tags.map((topic, index) => (
                        <TopicsSpan topic={topic} key={index} />
                    ))}
                </span>
            </h3>

            {/* Likes Section */}
            <h3 className="text-yellow-400 text-xl font-extrabold mt-2">
                Likes: {article.likes}
            </h3>
        </div>
    );
}

export default Article;
