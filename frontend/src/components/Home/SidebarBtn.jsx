import React from "react";
import { Link } from "react-router-dom";

function SidebarBtn({ btnText, classes, functionToTrigger, navigateTo }) {
    return (
        <Link
            className={`text-xl font-semibold my-2 hover:scale-105 cursor-pointer hover:bg-[#121212] rounded py-2 px-4 shadow-[0_4px_6px_0_rgba(255,255,255,0.2)] transition-all duration-200 text-center ${classes}`}
            onClick={functionToTrigger}
            to={navigateTo}
        >
            {btnText}
        </Link>
    );
}

export default SidebarBtn;
