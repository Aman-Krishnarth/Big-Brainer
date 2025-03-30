import { StrictMode, useEffect } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import the AOS styles
import { ToastContainer } from "react-toastify";

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

// Component to initialize AOS and render the app
const AppWrapper = () => {
    useEffect(() => {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
            initClassName: "aos-init", // class applied after initialization
            animatedClassName: "aos-animate", // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: "ease", // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
        });
    }, []);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppWrapper />
            </PersistGate>
        </Provider>
    </StrictMode>
);
