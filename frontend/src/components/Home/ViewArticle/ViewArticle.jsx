import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

function ViewArticle() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState([]);
    const [date, setDate] = useState("");
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/article/view/${id}`,
                    { withCredentials: true }
                );

                setTitle(result.data.article.title);
                setTags(result.data.article.tags);
                setContent(result.data.article.content);
                setDate(
                    new Date(result.data.article.createdAt).toLocaleDateString()
                );
                setIsLiked(result.data.article.liked);
                setLikes(result.data.article.likes);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleLike = async () => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/article/like/${id}`,
                { withCredentials: true }
            );

            if (result.data.status) {
                setIsLiked(true);
                setLikes((prevLikes) => prevLikes + 1);
            }
        } catch (error) {
            console.error("Error liking article:", error);
        }
    };

    return (
        <div className="bg-[#212121] text-[#F9F9F9] px-6 md:px-16 lg:px-48 py-12">
            <article className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-gray-200 leading-tight">
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

                <div className="space-y-6 text-xl leading-relaxed text-gray-300">
                    {content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    {isLiked ? (
                        <p className="text-gray-300 text-lg mb-4 font-semibold">
                            You have already liked this article.
                        </p>
                    ) : (
                        <>
                            <p className="text-gray-300 text-lg mb-6 font-semibold">
                                Liked the article? Show your support by liking
                                it!
                            </p>
                            <button
                                onClick={handleLike}
                                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
                            >
                                Like this article ({likes})
                            </button>
                        </>
                    )}
                </div>
            </article>
        </div>
    );
}

export default ViewArticle;
