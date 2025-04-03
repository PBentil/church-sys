import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import church from "../images/church .avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        // Fake authentication (replace with actual logic)
        if (email === "P.Bentil@gmail.com" && password === "password") {
            navigate("/dashboard"); // Redirect after login
        } else {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
                <div className="w-full max-w-md">
                    <h2 className="text-xl mb-2 text-gray-800 font-light"><span className="text-sky-700 font-bold">Faith</span>Connect</h2>
                    <h2 className="text-2xl font-semibold text-sky-700">Welcome back!</h2>
                    <h3 className="text-gray-500 text-sm mb-8">Enter your username and password</h3>
                    {error && <p className="text-light text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm  text-gray-700 mt-3 mb-3">Email</label>

                            <input
                                type="email"
                                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sky-700"
                                placeholder="admin@church.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <label className="block  text-sm text-gray-700 mt-3">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-2 border rounded  focus:outline-none focus:ring-2 focus:ring-sky-700"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <button className="w-full bg-sky-700 text-white p-3 rounded-lg hover:bg-sky-800 transition">
                            Login
                        </button>
                        <div className="mt-2 text-right">
                            <Link to="/forgot-password" className="text-sky-800 hover:underline text-sm">
                                Forgot Password?
                            </Link>
                            <p className="font-extralight text-sm text-gray-700 mt-2">©2025 FaithConnect-Powered By Bentil</p>
                        </div>

                    </form>
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

export default Login;