import React, { useEffect } from "react";
import LandingPageNavbar from "./LandingPageNavbar";
import LandingPageFooter from "./LandingPageFooter";
import LandingPageContent from "./LandingPageContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    });

    return (
        <div className="relative">
            <div className="h-screen bg-gradient-to-b from-blue-500 to-white fixed top-0 left-0 right-0 z-0">
                {/* Background content */}
            </div>

            <div className="relative z-10  min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
                <div className="">
                    <LandingPageNavbar />
                </div>
                <div className="">
                    <LandingPageContent />
                </div>
                <div className="">
                    <LandingPageFooter />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
