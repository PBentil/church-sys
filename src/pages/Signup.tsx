import { useState } from "react";
import { Link } from "react-router-dom";
import church from "../images/church .avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface SignUpProps {
    onSignUp: (data: {
        name: string;
        email: string;
        password: string;
    }) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Please fill out all fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Call the parent handler with form data
        onSignUp({ name, email, password });
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
                <div className="w-full max-w-md">
                    <h2 className="text-xl mb-2 text-gray-800 font-light">
                        <span className="text-sky-700 font-bold">Faith</span>Connect
                    </h2>
                    <h2 className="text-2xl font-semibold text-sky-700">Create an account</h2>
                    <h3 className="text-gray-500 text-sm mb-8">Sign up to get started</h3>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@faithconnect.com"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                            />
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                            />
                        </div>

                        <button className="w-full bg-sky-700 text-white p-3 rounded-lg hover:bg-sky-800 transition">
                            Sign Up
                        </button>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-sky-800 hover:underline">Login here</Link>
                        </div>

                        <p className="font-extralight text-sm text-gray-700 mt-2 text-center">
                            ©2025 FaithConnect - Powered By Bentil
                        </p>
                    </form>
                </div>
            </div>

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

export default SignUp;
