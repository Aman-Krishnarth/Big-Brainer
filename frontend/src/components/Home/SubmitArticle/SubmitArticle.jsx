import React, { useState } from "react";
import axios from "axios";

function SubmitArticle() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [sending, setSending] = useState(false);

    const presentTags = ["Science", "History", "Technology", "Philosophy", "Random Fun"];

    const handleTagSelect = (e) => {
        const selectedTag = e.target.value;
        if (!tags.includes(selectedTag)) {
            setTags([...tags, selectedTag]);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/article`,
            { title, excerpt, content, tags },
            { withCredentials: true }
        );

        alert(result.data.message);
        setSending(false);

        if (result.data.status) {
            setTitle("");
            setExcerpt("");
            setContent("");
            setTags([]);
        }
    };

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
                            rows="5"
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
                        <select
                            id="tags"
                            onChange={handleTagSelect}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                        >
                            <option value="" disabled selected>
                                Select a tag
                            </option>
                            {presentTags.map((tag, index) => (
                                <option key={index} value={tag}>{tag}</option>
                            ))}
                        </select>
                        {/* Display selected tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, index) => (
                                <div key={index} className="bg-[#32CD32] text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="text-black font-bold cursor-pointer hover:text-white text-lg hover:scale-110 transition-all duration-200">×</button>
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
