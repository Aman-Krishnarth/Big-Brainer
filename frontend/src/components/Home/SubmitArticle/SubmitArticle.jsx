import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SubmitArticle() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState(""); // State for the new tag input
    const [sending, setSending] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleTagSelect = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag(""); // Clear input field after adding tag
        }
    };

    const handleTagKeyPress = (e) => {
        if (e.key === "Enter" && newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag(""); // Clear input field after adding tag
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            // Split the content by new lines to convert into an array of paragraphs
            const contentArray = content
                .split("\n")
                .filter((para) => para.trim() !== "");

            console.log(contentArray);

            // Make the API request
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/article`,
                { title, excerpt, content: contentArray, tags },
                { withCredentials: true }
            );

            // Handle the response

            // Reset form if successful
            if (result.data.status) {
                toast.success(result.data.message);
                setTitle("");
                setExcerpt("");
                setContent("");
                setTags([]);
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            // Check if the error is due to a response error (status outside 2xx)
            if (error.response) {
                // Access the response from the backend
                console.error("Backend Error:", error.response.data);
                toast.error(
                    error.response.data.message ||
                        "Something went wrong. Please try again."
                );
            } else {
                // If the error is not related to the response (e.g., network issues)
                console.error("Error:", error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            // Always stop the sending state, regardless of success or failure
            setSending(false);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    });

    return (
        <div className="flex justify-center items-center bg-[#1F1F1F] text-white ">
            <div className="w-full max-w-2xl bg-[#292929] p-8 rounded-lg shadow-lg border border-[#444] ">
                <h1 className="text-3xl font-bold text-center mb-4 text-[#32CD32]">
                    Submit an Article (Finally, You’re Useful)
                </h1>
                <p className="text-gray-300 text-center mb-6 text-lg">
                    Wow, you actually decided to contribute? That’s a first.
                    Just don’t submit total nonsense, or I’ll pretend I never
                    saw it. Pick a good title, write something meaningful, and
                    prove your brain still works!
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Make it catchy..."
                        />
                    </div>
                    <div>
                        <label className="block text-lg mb-2" htmlFor="excerpt">
                            Excerpt
                        </label>
                        <input
                            type="text"
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Summarize your masterpiece..."
                        />
                    </div>
                    <div>
                        <label className="block text-lg mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="10"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Write something insightful..."
                        />
                    </div>
                    <div>
                        <label className="block text-lg mb-2" htmlFor="tags">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-4 items-center">
                            <input
                                type="text"
                                id="tags"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleTagKeyPress} // Allow enter key to add the tag
                                className="p-2 rounded-md border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-[#32CD32]"
                                placeholder="Add a tag"
                            />
                            <button
                                type="button"
                                onClick={handleTagSelect} // Add tag via button click
                                className="px-4 py-2 bg-[#32CD32] text-black rounded-md font-semibold hover:bg-[#28A428] transition-all duration-200 focus:outline-none cursor-pointer"
                            >
                                Add Tag
                            </button>
                        </div>

                        {/* Display selected tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-[#32CD32] text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-black font-bold cursor-pointer hover:text-white text-lg hover:scale-110 transition-all duration-200"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#32CD32] text-black text-lg font-semibold py-3 rounded-lg hover:bg-[#28A428] cursor-pointer transition-transform transform hover:scale-105"
                    >
                        {sending ? "Submitting..." : "Submit & Impress Us"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubmitArticle;
