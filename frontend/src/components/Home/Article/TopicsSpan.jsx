import React from "react";

function TopicsSpan({ topic }) {
    return (
        <span className="mx-1 rounded-full px-2 py-1 border-2 border-amber-300">
            {topic}
        </span>
    );
}

export default TopicsSpan;
