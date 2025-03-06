import { useState } from "react";
import { Link } from "react-router-dom";
import church from "../images/church .avif"
const ForgotPassword = () => {
    const [email, setEmail] = useState("");


    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Left Section - Forgot Password Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:mt-4 ">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4">Forgot Password</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        Enter your email address below to receive a password reset link.
                    </p>

                    {/* Email Input */}
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sky-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded mt-4 w-full">
                        Send Reset Link
                    </button>

                    {/* Back to Login */}
                    <div className="mt-3 text-center">
                        <Link to="/login" className="text-sky-700 hover:underline text-sm">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Section - Church Image */}
            <div className="hidden md:flex w-1/2 bg-gray-200">
                <img
                    src={church}
                    alt="Church"
                    className="w-full h-screen object-cover"
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
