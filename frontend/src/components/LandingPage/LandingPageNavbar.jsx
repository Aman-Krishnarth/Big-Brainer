import React from "react";
import { Link } from "react-router-dom";

function LandingPageNavbar() {
    return (
        <nav className="flex justify-between px-10 py-2 items-center shadow-md ">
            <div className="h-20 w-20 ">
                <img
                    src="https://imgs.search.brave.com/TGeY4Wvc9wRAh8IIMWPlSYxmctU3B4Q8yWhJaMNMEGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L2ItbGV0dGVyLWxv/Z28tcG5nLTAucG5n"
                    alt="Big Brainer Logo"
                    className="h-full w-full"
                />
            </div>

            <div className="">
                <Link to="/login">
                    <button className="hover:underline hover:cursor-pointer text-white text-2xl font-semibold hover:scale-110 hover:font-bold transition-all duration-200 tracking-wider">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default LandingPageNavbar;
