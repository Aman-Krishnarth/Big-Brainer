import React from "react";

function ArticleListSkeleton() {
    // Create an array of length 3 for rendering three skeleton loaders
    const skeletons = Array(3).fill(null);

    return (
        <div>
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="bg-[#3A3A3A] animate-pulse hover:bg-[#4F4F4F] hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-3xl flex flex-col gap-4 my-4 shadow-lg hover:shadow-2xl transform"
                >
                    {/* Title Section */}
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>

                    {/* Date Section */}
                    <div className="h-4 bg-gray-600 rounded w-1/2 mt-2"></div>

                    {/* Excerpt Section */}
                    <div className="h-4 bg-gray-600 rounded w-full mt-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6 mt-1"></div>

                    {/* Likes Section */}
                    <div className="h-6 bg-gray-700 rounded w-1/4 mt-2"></div>
                </div>
            ))}
        </div>
    );
}

export default ArticleListSkeleton;
