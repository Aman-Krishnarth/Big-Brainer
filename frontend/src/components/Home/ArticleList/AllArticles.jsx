import React, { useEffect, useState, useRef } from "react";
import Article from "./Article.jsx";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllArticles() {
    const [articles, setArticles] = useState([]);
    const [filteringTags, setFilteringTags] = useState([]); // State for filtering tags
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // Reference to the input field
    const inputRef = useRef(null);

    useEffect(() => {
        (async function fetchArticles() {
            // Fetch articles from backend
            const result = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/article`
            );

            setArticles(result.data.articles);
        })();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    // Handle adding a tag
    const handleAddTag = (e) => {
        const inputValue = e.target.value.trim(); // Trim the value before adding it
        if (e.key === "Enter" && inputValue !== "") {
            setFilteringTags((prevTags) => [...prevTags, inputValue]);
            e.target.value = ""; // Clear input after adding tag
        }
    };

    // Handle adding a tag via button click
    const handleAddTagClick = () => {
        const inputValue = inputRef.current.value.trim(); // Get input value via ref
        if (inputValue !== "") {
            setFilteringTags((prevTags) => [...prevTags, inputValue]);
            inputRef.current.value = ""; // Clear input field after adding tag
        }
    };

    // Handle removing a tag
    const removeTag = (tagToRemove) => {
        setFilteringTags((prevTags) =>
            prevTags.filter((tag) => tag !== tagToRemove)
        );
    };

    useEffect(()=>{
        console.log(filteringTags)
    },[filteringTags])

    return (
        <div className="p-3 flex flex-col gap-4">
            <h1 className="text-center text-3xl my-2 font-bold underline">
                Less Scrolling, More Knowing
            </h1>

            <p className="text-xl text-center font-semibold mb-5">
                Your brain isn’t a houseplant—you can’t just water it with memes
                and expect it to grow. Read something, learn something, and
                maybe, just maybe, you won’t sound clueless in your next
                conversation.
            </p>

            <h3 className="text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 inline-block px-4 py-2 rounded-lg shadow-md">
                A bunch of articles below. Find one or two your brain cells can
                process and try not to forget it in five minutes.
            </h3>

            {/* Search Bar for Tags */}
            <div className="flex gap-2 mb-4 items-center">
                <input
                    ref={inputRef} // Attach the ref to the input element
                    type="text"
                    placeholder="Enter tag and press Enter"
                    onKeyDown={handleAddTag}
                    className="p-2 rounded-md border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAddTagClick} // Trigger tag addition on button click
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer"
                >
                    Add Tag
                </button>
            </div>

            {/* Display selected tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {filteringTags.map((tag, index) => (
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

            {/* Display Articles */}
            {articles.map((article, index) => (
                <Article article={article} number={index + 1} key={index} />
            ))}
        </div>
    );
}

export default AllArticles;
