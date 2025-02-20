import React from "react";
import TopicsSpan from "./TopicsSpan";

function Article({article, number}) {
    return (
        <div className="bg-[#383737] hover:bg-[#454444] hover:scale-105 transition-all duration-300 cursor-pointer p-3 rounded-3xl flex flex-col gap-3 my-2">
            <h3 className="text-lg font-semibold">
                {" "}
                {number}. {article.title}
            </h3>
            <h3 className="text-lg font-semibold">Published: {article.date}</h3>
            <h3>
                Topics

                {
                    article.topics.map((topic)=>{
                        return <TopicsSpan topic={topic}/>
                    })
                }

            </h3>
        </div>
    );
}

export default Article;
