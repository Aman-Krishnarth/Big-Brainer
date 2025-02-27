import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const otpRefs = useRef([]);

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "username") {
            setUsername(e.target.value);
        }
    };

    const handleOtpChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };

    const sendOtp = async () => {
        if (!email || email.length === 0) {
            alert("Please enter email");
            return;
        }

        setSendingOtp(true);
        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/otp/sendOtp`,
            { email }
        );
        setSendingOtp(false);
        setOtpSent(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
            { email, password, otp: otp.join(""), username },
            { withCredentials: true }
        );

        if (result.data.status) {
            setTimeout(() => {
                alert("User created successfully");
                navigate("/login");
            }, 2000);
        }
    };

    useEffect(()=>{
        if(user){
            navigate("/home")
        }
    },[])

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
                            <ArrowLeft className="mr-1" />
                            Back to Main Page
                        </Link>
                    </div>

                    <div className="flex space-x-12">
                        <div className="w-1/2">
                            <h1 className="text-4xl font-bold text-blue-800 mb-4">
                                Welcome Aboard! 🎉
                            </h1>
                            <p className="text-2xl text-gray-700 font-semibold tracking-wide">
                                It's truly impressive that you’re taking the
                                first step. You’re either about to fall back
                                into the group of losers... or join the ranks of
                                the intellectuals. Your move. Make it count.
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
                                        type="text"
                                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="What do you like to be called?"
                                        name="username"
                                        value={username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-2">
                                        {/* Password Input with Validation */}

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            required
                                        />

                                        {/* Eye Icon for Password Visibility */}
                                        <div
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="cursor-pointer flex justify-center items-center"
                                        >
                                            {showPassword ? (
                                                <Eye size={28} />
                                            ) : (
                                                <EyeOff size={28} />
                                            )}
                                        </div>
                                    </div>

                                    {/* OTP Button */}
                                    <button
                                        className="text-center cursor-pointer bg-blue-100 hover:bg-blue-200 transition-all hover:scale-110 duration-200 rounded px-2 py-3 font-semibold text-xl mx-auto block"
                                        onClick={sendOtp}
                                        disabled={sendingOtp}
                                    >
                                        {sendingOtp ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-blue-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : otpSent ? (
                                            "OTP Sent"
                                        ) : (
                                            "Click to Generate OTP"
                                        )}
                                    </button>

                                    {/* OTP Input */}
                                    <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
                                        Enter OTP
                                    </h2>
                                    <div className="flex justify-center space-x-2 mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="w-10 h-10 text-center text-xl border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={digit}
                                                onChange={(e) =>
                                                    handleOtpChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                ref={(el) =>
                                                    (otpRefs.current[index] =
                                                        el)
                                                }
                                            />
                                        ))}
                                    </div>

                                    {/* Signup Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                                    >
                                        Signup
                                    </button>
                                </div>

                                <div className="text-center my-4 font-semibold text-gray-700">
                                    OR
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                                    {/* Google Login Button */}
                                    <button className="w-full bg-white border border-gray-300 text-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer">
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
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-blue-500 font-semibold hover:underline"
                                        >
                                            Login now
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

export default Signup;
