import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/AuthPages/Login/Login.jsx";
import Signup from "./components/AuthPages/Signup/Signup.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
