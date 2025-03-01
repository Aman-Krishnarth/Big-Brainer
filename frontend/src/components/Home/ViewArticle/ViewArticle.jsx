import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewArticle() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState([]);
    const [date, setDate] = useState("");
    const [likes, setLikes] = useState(0); // New state for likes

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const fetchArticle = async () => {
            const result = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/article/${id}`
            );

            setTitle(result.data.article.title);
            setTags(result.data.article.tags);
            setContent(result.data.article.content);
            setDate(formatDate(result.data.article.createdAt));
            setLikes(result.data.article.likes);
        };

        fetchArticle();
    }, [id]);

    const handleLike = () => {
        console.log("handle like clicked");
    };

    return (
        <div className=" bg-[#212121] text-[#F9F9F9] px-6 md:px-16 lg:px-48 py-12">
            <article className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
                    {title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-[#32CD32] text-black text-sm font-semibold px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-gray-400 text-md mb-6 italic">
                    Published on: {date}
                </p>

                <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                    {content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* New "Like" Section */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-lg mb-4">
                        Liked the article? Show your support by liking it!
                    </p>
                    <button
                        onClick={handleLike}
                        className="bg-[#32CD32] text-black px-6 py-2 rounded-full text-xl font-semibold hover:bg-[#28a428] transition duration-300 cursor-pointer"
                    >
                        Like this article ({likes})
                    </button>
                </div>
            </article>
        </div>
    );
}

export default ViewArticle;
