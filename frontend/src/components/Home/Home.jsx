import React, { useState } from "react";
import SidebarBtn from "./SidebarBtn";
import { Menu, X } from "lucide-react";

function Home() {
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

    const [sidebarBtns, setSidebarBtns] = useState([
        {
            btnText: "Button 1",
            classes: "",
        },
        {
            btnText: "Button 2",
            classes: "",
        },
        {
            btnText: "Button 3",
            classes: "",
        },
        {
            btnText: "Logout",
            classes:
                "text-xl font-semibold my-2 cursor-pointer rounded py-2 px-6 border-2 border-[#FF3B3F] text-[#FF3B3F] hover:bg-[#FF3B3F] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out shadow-md",
            functionToTrigger: handleLogout,
        },
    ]);

    return (
        <div className="bg-[#212121] text-[#F9F9F9] min-h-screen grid grid-cols-[auto_1fr] relative">
            {/* Sidebar */}
            <div
                className={`fixed lg:relative top-0 left-0 h-screen bg-[#2D2D2D] px-11 py-2 w-80 lg:w-auto transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Close button for small screens */}
                <div className="lg:hidden flex justify-end p-4">
                    <button onClick={() => setSidebarOpen(false)}>
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Sidebar content */}
                <div className="my-3 px-11 py-2 text-white border-b-2 border-[#FFFFFF] hover:border-b-4 transition-all duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold">Big Brainer</h1>
                </div>

                <div className="flex flex-col">
                    {sidebarBtns.map((btn, k) => (
                        <SidebarBtn
                            btnText={btn.btnText}
                            classes={btn.classes}
                            functionToTrigger={btn.functionToTrigger}
                            key={k}
                        />
                    ))}
                </div>
            </div>

            {/* Overlay for small screens */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="bg-[#212121] flex-1">
                {/* Menu button for small screens */}
                <button
                    className="lg:hidden fixed top-4 left-4 bg-[#242424] p-2 rounded-full shadow-md"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="text-white" />
                </button>
                <div className="hover:bg-[#383737] cursor-pointer text-center">
                    idhar pe articles aayenge
                </div>
            </div>
        </div>
    );
}

export default Home;
