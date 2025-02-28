import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewArticle() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState([]);
    const [date, setDate] = useState("");

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
        };

        fetchArticle();
    }, []);

    return (
        <div className="min-h-screen bg-[#212121] text-[#F9F9F9] px-6 md:px-16 lg:px-48 py-12">
            <article className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-white leading-tight">{title}</h1>

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

                <p className="text-gray-400 text-md mb-6 italic">Published on: {date}</p>

                <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                    {content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default ViewArticle;
