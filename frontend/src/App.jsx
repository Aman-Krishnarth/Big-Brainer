import React from "react";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="min-h-screen w-full">
            <Outlet />
        </div>
    );
}

export default App;
