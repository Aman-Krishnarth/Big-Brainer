import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../redux/slices/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Set loading state to true before API call

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(result);

            if (result.data.status) {
                toast.success(result.data.message);
                dispatch(setUser(result.data.retUser));
                navigate("/home");
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Set loading state to false after API call completes
        }
    };

    const responseGoogle = async (authResult) => {
        try {
            console.log(authResult);

            if (authResult["code"]) {
                const result = await axios.post(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/googleAuth/login?code=${authResult["code"]}`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                console.log(result);

                dispatch(setUser(result.data.retUser));

                if (result.data.status) {
                    navigate("/home");
                }
            }
        } catch (error) {
            console.log("error aa gaya");
            console.log(error);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div className="relative">
            <div className="h-screen bg-gradient-to-b from-blue-500 to-white fixed top-0 left-0 right-0 z-0">
                {/* Background content */}
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="w-full max-w-7xl">
                    {/* Back to Main Page Link */}
                    <div className="text-left mb-4 hover:underline text-xl">
                        <Link
                            to="/"
                            className="flex items-center text-white font-semibold "
                        >
                            <ArrowLeft className="mr-1" />{" "}
                            {/* Adds space between icon and text */}
                            Back to Main Page
                        </Link>
                    </div>

                    <div className="flex space-x-12">
                        <div className="w-1/2">
                            <h1 className="text-4xl font-bold text-blue-800 mb-4">
                                Congratulations 🎉
                            </h1>
                            <p className="text-2xl text-gray-700 font-semibold tracking-wide">
                                <Typewriter
                                    words={[
                                        "Wow. It's truly amazing that you decided to work on yourself today. Like, who would've thought? You’re actually doing this. Look at you! 🙄 But seriously, no need to hold back now. Keep pushing forward, and don’t even think about stopping. You’re on the right track!",
                                    ]}
                                    loop={0} // Change loop count as needed
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={50} // You can adjust speed here
                                    deleteSpeed={50}
                                    delaySpeed={50}
                                />
                            </p>
                        </div>

                        <div className="w-1/2 bg-gradient-to-b from-blue-400 to-white p-6 rounded-lg shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                                        Continue with Email
                                    </h2>

                                    {/* Email Input with Validation */}
                                    <input
                                        type="email"
                                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // email validation regex
                                        title="Please enter a valid email address"
                                    />

                                    <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-2">
                                        {/* Password Input with Validation */}
                                        <input
                                            type={`${
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }`}
                                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            required
                                            minLength="6" // minimum length for password
                                            title="Password must be at least 6 characters"
                                        />

                                        {/* Eye Icon for Password Visibility */}
                                        <div
                                            onClick={handleShowPassword}
                                            className="cursor-pointer flex justify-center items-center"
                                        >
                                            {showPassword ? (
                                                <Eye
                                                    size={28}
                                                    title="lfsjksdlfds"
                                                />
                                            ) : (
                                                <EyeOff size={28} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                                        disabled={isLoading} // Disable button while loading
                                    >
                                        {isLoading ? (
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin border-t-2 border-blue-600 w-6 h-6 rounded-full mr-2"></div>
                                                Logging In...
                                            </div>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </div>

                                <p className="text-center font-semibold text-xl text-[#665d5d]">
                                    OR
                                </p>

                                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                                    {/* Google Login Button */}
                                    <button
                                        className="w-full bg-white border border-gray-300 text-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer hover:scale-105"
                                        onClick={handleGoogleLogin}
                                    >
                                        <img
                                            src="https://imgs.search.brave.com/cMeR-TEzSzc3L_T_t4c0ZKSZu5B4BxkMPGrZ48urikE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nby8xNTAvR29v/Z2xlX0ljb25zLTA5/LTUxMi5wbmc"
                                            alt="Google Logo"
                                            className="w-6 h-6"
                                        />
                                        <span>Continue with Google</span>
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    {/* Login Link */}
                                    <p className="text-gray-600 text-lg">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/signup"
                                            className="text-blue-500 font-semibold hover:underline"
                                        >
                                            Signup now
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
