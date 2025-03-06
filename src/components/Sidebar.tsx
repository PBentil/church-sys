import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faCog, faEarth, faGlobe, faUsers, faClipboardList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const [isOpen] = useState(true); // Default open on desktop
    const [isMobileOpen, setIsMobileOpen] = useState(false); // For mobile toggle

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 text-white bg-sky-700 p-2 rounded"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <FontAwesomeIcon icon={isMobileOpen ? faTimes : faBars} size="lg" />
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white text-gray-600 shadow-lg z-50
                transition-all duration-300 ease-in-out flex flex-col justify-between
                ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"}
                ${isOpen ? "md:w-64" : "md:w-16"} md:translate-x-0`}>

                {/* Header (Church Name) */}
                <div className="flex items-center justify-between p-4 border-b border-sky-700">
                    <h1 className={`text-xl font-bold transition-all duration-300 p-1.5 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                        <span className="text-sky-700">Faith</span>Connect
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-4 px-4 mt-4 flex-1">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faHome} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Dashboard</span>
                    </Link>
                    <Link to="/diocese" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faEarth} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Diocese</span>
                    </Link>
                    <Link to="/circuits" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faGlobe} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Circuits</span>
                    </Link>
                    <Link to="/members" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faUsers} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Members</span>
                    </Link>
                    <Link to="/attendance" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faClipboardList} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Attendance</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faCog} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Settings</span>
                    </Link>
                </nav>

                {/* Logout Button (Sticks to Bottom) */}
                <div className="px-4 pb-2 py-2 border-t-1 border-red-500">
                    <Link
                        to="/login"
                        className="flex  gap-3 p-3 rounded text-center hover:bg-red-500 hover:text-white w-full"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Logout</span>
                    </Link>
                </div>

                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div className="fixed inset-0  opacity-50 md:hidden z-40" onClick={() => setIsMobileOpen(false)}></div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
