import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const otpRefs = useRef([]);

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleOtpChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            // Allow only numbers
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next box automatically
            if (value && index < otp.length - 1) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };

    function sendOtp() {

        

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("call kar raha");

        const result = await axios.post(
            "http://localhost:8000/api/v1/auth/signup",
            {
                email,
                password,
                otp: otp.join(""), // Convert array to string
            },
            {
                withCredentials: true,
            }
        );

        console.log(result);

        if (result.data.status) {
            setTimeout(() => {
                alert("User created successfully");
                navigate("/login");
            }, 2000);
        }
    };

    return (
        <div className="relative">
            <div className="h-screen bg-gradient-to-b from-blue-500 to-white fixed top-0 left-0 right-0 z-0"></div>

            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6">
                <div className="w-full max-w-7xl">
                    {/* Back to Main Page Link */}
                    <div className="text-left mb-4 hover:underline text-xl">
                        <Link
                            to="/"
                            className="flex items-center text-white font-semibold"
                        >
                            <ArrowLeft className="mr-1" /> Back to Main Page
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-12 items-center lg:items-start">
                        {/* Left Side - Motivational Note */}
                        <div className="w-full lg:w-1/2 lg:mt-0 mt-6">
                            <h1 className="text-4xl font-bold text-blue-800 mb-4 text-left lg:text-left">
                                Welcome Aboard! 🎉
                            </h1>
                            <p className="text-2xl text-gray-700 font-semibold tracking-wide text-left lg:text-left">
                                It's truly impressive that you’re taking the
                                first step. You’re either about to fall back
                                into the group of losers... or join the ranks of
                                the intellectuals. Your move. Make it count.
                            </p>
                        </div>

                        {/* Right Side - Signup Form */}
                        <div className="w-full lg:w-1/2 bg-gradient-to-b from-blue-400 to-white p-6 rounded-lg shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                                        Continue with Email
                                    </h2>

                                    <input
                                        type="email"
                                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                        title="Please enter a valid email address"
                                    />

                                    <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-2">
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
                                            minLength="6"
                                            title="Password must be at least 6 characters"
                                        />
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

                                    <button className="text-center cursor-pointer bg-blue-400 rounded px-2 py-3 font-semibold text-xl mx-auto block"
                                    onClick={sendOtp}
                                    >Verify account</button>

                                    {/* OTP Verification Section */}
                                    <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
                                        Enter OTP
                                    </h2>
                                    <div className="flex justify-center space-x-2 mb-4 flex-wrap md:flex-auto max-w-xs mx-auto">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10  text-center text-xl border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none gap-2 p-1"
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

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                                    >
                                        Signup
                                    </button>
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
