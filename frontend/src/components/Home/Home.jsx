import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Home() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();

        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );

        alert(result.data.message);

        if (result.data.status) {
            navigate("/");
        }
    };

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarOpen && !document.getElementById("sidebar").contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [sidebarOpen]);

    return (
        <div className="flex h-screen bg-[#1e1e1e] text-white">
            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed lg:relative top-0 left-0 h-screen p-6 transition-transform duration-300 lg:translate-x-0 z-50 bg-[#121212] 
                ${sidebarOpen ? "translate-x-0 w-4/5" : "-translate-x-full w-1/5 lg:w-1/5"}`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Big-Brainer</h1>
                    {/* Close button for small screens */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X />
                    </button>
                </div>
                <nav className="space-y-4">
                    <button className="w-full p-3 bg-[#242424] rounded-lg transition hover:bg-[#333] hover:shadow-lg hover:shadow-blue-500/50">
                        Placeholder 1
                    </button>
                    <button className="w-full p-3 bg-[#242424] rounded-lg transition hover:bg-[#333] hover:shadow-lg hover:shadow-blue-500/50">
                        Placeholder 2
                    </button>
                    <button className="w-full p-3 bg-[#242424] rounded-lg transition hover:bg-[#333] hover:shadow-lg hover:shadow-blue-500/50">
                        Placeholder 3
                    </button>
                    <button className="w-full p-3 bg-[#242424] rounded-lg transition hover:bg-[#333] hover:shadow-lg hover:shadow-blue-500/50">
                        Placeholder 4
                    </button>
                    {/* Logout button for small screens */}
                    <button
                        className="lg:hidden w-full p-3 bg-red-600 rounded-lg transition hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-[#252525] p-6">
                {/* Toggle Button for Small Screens */}
                {!sidebarOpen && (
                    <button
                        className="lg:hidden fixed top-4 left-4 bg-[#242424] p-2 rounded-full shadow-md"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="text-white" />
                    </button>
                )}
                {/* Logout button for large screens */}
                <button
                    className="hidden lg:block fixed top-4 right-4 bg-red-600 p-2 rounded-lg transition hover:bg-red-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <h2 className="text-3xl font-semibold text-center">Main Content</h2>
                <p className="mt-4 text-gray-300 text-left">
                    This is where your articles or other content will go.
                </p>
            </div>
        </div>
    );
}

export default Home;
