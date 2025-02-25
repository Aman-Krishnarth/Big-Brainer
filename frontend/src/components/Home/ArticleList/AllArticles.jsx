import React, { useEffect, useState } from "react";
import Article from "./Article.jsx";
import axios from "axios";

function AllArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async function fetchArticles() {
            // Fetch articles from backend

            const result = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/article`
            );

            console.log(result);

            console.log(result.data.articles);

            console.log(Array.isArray(result.data.articles));

            setArticles(result.data.articles)

            // setArticles(result.data.articles)
        })();
    }, []);

    useEffect(() => {
        console.log("articles change hue hai");
        console.log(articles);
    }, [articles]);

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

            {articles.map((article, index) => (
                // console.log("")
                <Article article={article} number={index + 1} key={index} />
            ))}
        </div>
    );
}

export default AllArticles;
