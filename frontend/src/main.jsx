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
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ViewArticle from "./components/Home/ViewArticle/ViewArticle.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

let persistor = persistStore(store);

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
                element: (
                    <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    >
                        <Login />
                    </GoogleOAuthProvider>
                ),
            },
            {
                path: "/signup",
                element: (
                    <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    >
                        <Signup />
                    </GoogleOAuthProvider>
                ),
            },
            {
                path: "*",
                element: <PageNotFound />,
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
                    {
                        path: "/home/article/:id",
                        element: <ViewArticle />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </StrictMode>
);
