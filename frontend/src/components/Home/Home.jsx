import React, { useEffect, useRef, useState } from "react";
import SidebarBtn from "./SidebarBtn";
import { Menu, X } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();

        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );

        
        if (result.data.status) {
            toast.success(result.data.message);
            navigate("/");
            dispatch(setUser(null));
        }
    };

    const sidebarBtns = [
        { btnText: "Home", classes: "", navigateTo: "/home" },
        {
            btnText: "Submit Article",
            classes: "",
            navigateTo: "/home/submitArticle",
        },
        { btnText: "Feedback", classes: "", navigateTo: "/home/feedback" },
        {
            btnText: "Logout",
            classes:
                "text-xl font-semibold my-2 cursor-pointer rounded py-2 px-6 border-2 border-[#FF3B3F] text-[#FF3B3F] hover:bg-[#FF3B3F] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out shadow-md",
            functionToTrigger: handleLogout,
        },
    ];

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        let prompt = input;
        setInput("");

        // Delay to allow state to update before scrolling
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
        }, 100);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: "Ai Response coming soon", sender: "ai" },
            ]);
        }, 1200);

        const result = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/askAi/${prompt}`
        );

        setMessages((prev) => [
            ...prev,
            { text: result.data.result, sender: "ai" },
        ]);

        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-[#212121] text-[#F9F9F9] min-h-lvh flex relative">
            {/* Sidebar */}
            <div
                className={`fixed lg:relative top-0 left-0 h-screen bg-[#2D2D2D] px-11 py-2 w-80 lg:w-auto transition-transform duration-300 ease-in-out z-50 ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="lg:hidden flex justify-end p-4">
                    <button onClick={() => setSidebarOpen(false)}>
                        <X size={24} className="text-white" />
                    </button>
                </div>

                <div className="my-3 px-11 py-2 text-white border-b-2 border-[#FFFFFF] hover:border-b-4 transition-all duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold text-center">
                        Big Brainer
                    </h1>
                </div>

                <div className="flex flex-col">
                    {sidebarBtns.map((btn, k) => (
                        <SidebarBtn
                            btnText={btn.btnText}
                            classes={btn.classes}
                            functionToTrigger={btn.functionToTrigger}
                            navigateTo={btn.navigateTo}
                            key={k}
                        />
                    ))}
                </div>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto p-6 grid grid-rows-[auto_1fr] gap-4">
                <button
                    className="lg:hidden fixed top-4 left-4 bg-[#242424] p-2 rounded-full shadow-md"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="text-white" />
                </button>
                <Outlet />
            </div>

            {/* Chat with AI Button */}
            {!chatOpen && (
                <button
                    className="fixed bottom-4 right-4 bg-[#32CD32] text-black px-4 py-2 rounded-lg shadow-lg hover:bg-[#28A428] transition cursor-pointer"
                    onClick={() => setChatOpen(true)}
                >
                    Ask AI
                </button>
            )}

            {/* Chat Window */}
            {chatOpen && (
                <div className="fixed bottom-4 right-4 bg-[#2D2D2D] w-96 h-96 rounded-lg shadow-lg p-4 flex flex-col border border-[#444]">
                    <div className="flex justify-between items-center pb-2 border-b border-[#444]">
                        <h2 className="text-white text-lg font-semibold">
                            Chat with AI
                        </h2>
                        <button
                            onClick={() => {
                                setChatOpen(false);
                                setMessages([]);
                            }}
                            className="text-white cursor-pointer hover:scale-110 transition-all duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div
                        className="flex-1 overflow-y-auto p-2"
                        ref={chatContainerRef}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg ${
                                    msg.sender === "user"
                                        ? "bg-[#32CD32] text-black self-end"
                                        : "bg-[#444] text-white self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 bg-[#333] text-white rounded-lg border border-[#555] focus:ring-2 focus:ring-[#32CD32] focus:outline-none"
                            placeholder="Ask something..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-[#32CD32] text-black px-4 py-2 rounded-lg hover:bg-[#28A428] cursor-pointer"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
