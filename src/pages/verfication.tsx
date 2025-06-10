import { Link } from "react-router-dom";
import church from "../images/church .avif";
import { useState } from "react";

const Verification = () => {
    const [otp, setOtp] = useState("");

    const handleOtp = () => {
        if (!otp.trim()) {
            alert("Please enter the OTP.");
            return;
        }

        // You can add actual OTP verification logic here
        alert(`OTP entered: ${otp}`);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:mt-4 ">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4">Verification OTP</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        Enter OTP to verify your email address
                    </p>

                    {/* OTP Input */}
                    <label className="block text-gray-700">OTP</label>
                    <input
                        type="text"
                        placeholder="Enter your OTP"
                        className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sky-700"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded mt-4 w-full"
                        onClick={handleOtp}
                    >
                        Verify OTP
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

export default Verification;
