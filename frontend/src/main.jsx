import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/AuthPages/Login/Login.jsx";
import Signup from "./components/AuthPages/Signup/Signup.jsx";
import Home from "./components/Home/Home.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import AllArticles from "./components/Home/ArticleList/AllArticles.jsx";
import SubmitArticle from "./components/Home/SubmitArticle/SubmitArticle.jsx";

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
            {
                path: "/home",
                element: <Home />,
                children: [
                    {
                        path: "",
                        element: <AllArticles />,
                    },
                    {
                        path: "/home/feedback",
                        element: <Feedback />,
                    },
                    {
                        path: "/home/submitArticle",
                        element: <SubmitArticle />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
