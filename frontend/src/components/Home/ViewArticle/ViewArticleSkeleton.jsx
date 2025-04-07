import React from "react";

function ViewArticleSkeleton() {
    return (
        <div className="bg-[#212121] text-[#F9F9F9] px-6 md:px-16 lg:px-48 py-12 animate-pulse">
            <article className="max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="h-10 bg-gray-700 rounded w-3/4 mb-6"></div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {Array(3).fill(null).map((_, index) => (
                        <div
                            key={index}
                            className="h-6 bg-[#32CD32] rounded-full w-24 mb-2"
                        ></div>
                    ))}
                </div>

                {/* Date Section */}
                <div className="h-4 bg-gray-600 rounded w-1/2 mb-6"></div>

                {/* Content Section */}
                <div className="space-y-4 text-xl leading-relaxed text-gray-300">
                    {Array(5).fill(null).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-600 rounded w-full"></div>
                    ))}
                </div>

                {/* Like Section */}
                <div className="mt-12 text-center">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
                        <div className="h-6 bg-gray-700 rounded w-32"></div>
                    </button>
                </div>
            </article>
        </div>
    );
}

export default ViewArticleSkeleton;
