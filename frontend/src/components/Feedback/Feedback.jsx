import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Importing a loading icon
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Feedback() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        if (e.target.id === "subject") {
            setSubject(e.target.value);
        } else {
            setContent(e.target.value);
        }
    };
    const user = useSelector(state => state.auth.user);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/feedback`,
                { subject, content },
                { withCredentials: true }
            );

            console.log(result);

            if (!result.data.status) {
                alert(result.data.message);
                setSending(false);
                return;
            }

            alert("come back later with some more useful and good feedback.");

            setSubject("");
            setContent("");
            setSending(false);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Something went wrong. Try again later.");
        }
    };

    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    },[])

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
                    touched. But seriously, don’t just smash your keyboard—write
                    something that makes sense. Otherwise, you’re just wasting
                    both our time and my server’s processing power. Thanks for
                    being (hopefully) useful!
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
                        disabled={sending}
                        className={`w-full flex items-center justify-center gap-2 bg-[#32CD32] text-black text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 ${
                            sending
                                ? "opacity-75 cursor-not-allowed"
                                : "hover:bg-[#28A428]"
                        }`}
                    >
                        {sending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Submitting...
                            </>
                        ) : (
                            "Submit & Hope We Care"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;
