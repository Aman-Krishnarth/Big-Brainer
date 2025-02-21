import React, { useState } from "react";
import axios from "axios";

function Feedback() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const handleChange = (e) => {
        if (e.target.id === "subject") {
            setSubject(e.target.value);
        } else {
            setContent(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(subject);
        console.log(content);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1F1F1F] text-white p-6">
            <div className="w-full max-w-2xl bg-[#292929] p-8 rounded-lg shadow-lg border border-[#444]">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-center mb-4 text-[#32CD32]">
                    Give Us Your Precious Wisdom
                </h1>

                {/* Paragraph */}
                <p className="text-gray-300 text-center mb-6 text-lg">
                    Wow, you actually care enough to leave feedback? We’re
                    touched. But seriously, don’t just smash your keyboard—
                    write something that makes sense. Otherwise, you’re just
                    wasting both our time and my server’s processing power.
                    Thanks for being (hopefully) useful!
                </p>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg mb-2" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={handleChange}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Give your feedback a dramatic title..."
                        />
                    </div>

                    <div>
                        <label
                            className="block text-lg mb-2"
                            htmlFor="feedback"
                        >
                            Your Genius Feedback
                        </label>
                        <textarea
                            id="feedback"
                            rows="5"
                            value={content}
                            onChange={handleChange}
                            className="w-full p-4 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Go ahead, roast us or praise us (preferably the latter)..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#32CD32] text-black text-lg font-semibold py-3 rounded-lg hover:bg-[#28A428] transition-transform transform hover:scale-105"
                    >
                        Submit & Hope We Care
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;
