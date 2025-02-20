import React from "react";

function SidebarBtn({btnText,classes,functionToTrigger}) {
    return (
        <button className={`text-xl font-semibold my-2 hover:scale-105 cursor-pointer hover:bg-[#121212] rounded py-2 px-4 shadow-[0_4px_6px_0_rgba(255,255,255,0.2)] transition-all duration-200 ${classes}`}
        onClick={functionToTrigger}
        >{btnText}</button>
    );
}

export default SidebarBtn;
