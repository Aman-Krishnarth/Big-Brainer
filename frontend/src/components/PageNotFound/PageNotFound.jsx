import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PageNotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#1a1a1a] text-white text-center">
            <nav className="absolute top-4 left-4">
                <Link
                    to="/"
                    className="text-[#32CD32] text-lg font-semibold hover:underline"
                >
                    Return to Website
                </Link>
            </nav>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <h1 className="text-8xl font-extrabold text-[#FF3B3F]">404</h1>
                <p className="text-xl mt-4 text-gray-400">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <p className="text-lg text-gray-500 mt-2">
                    Maybe you took a wrong turn somewhere?
                </p>

                <Link
                    to="/"
                    className="mt-6 bg-[#32CD32] text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#28A428] transition-all"
                >
                    Go Home
                </Link>
            </motion.div>
        </div>
    );
}

export default PageNotFound;
