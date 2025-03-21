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
            className="bg-[#383737] hover:bg-[#454444] hover:scale-105 transition-all duration-300 cursor-pointer p-3 rounded-3xl flex flex-col gap-3 my-2 "
            onClick={handleArticleClick}
        >
            <h3 className="text-lg font-semibold">
                {" "}
                {number}. {article.title}
            </h3>
            <h3 className="text-lg font-semibold">
                Published: {formatDate(article.createdAt)}
            </h3>
            <p className="text-lg font-semibold tracking-wide">
                Preview: {article.excerpt}
            </p>
            <h3 className="text-lg font-semibold">
                Topics
                {article.tags.map((topic, index) => {
                    return <TopicsSpan topic={topic} key={index} />;
                })}
            </h3>
            <h3 className="text-green-500 text-2xl font-extrabold drop-shadow-lg">
                Likes: {article.likes}
            </h3>
        </div>
    );
}

export default Article;
