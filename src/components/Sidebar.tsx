import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faCog, faEarth, faGlobe, faUsers, faClipboardList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./Modal.tsx";

const Sidebar = () => {
    const [isOpen] = useState(true); // Default open on desktop
    const [isMobileOpen, setIsMobileOpen] = useState(false); // For mobile toggle

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        window.location.href = '/login'; // 👈 Redirect to login
    };

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
                    <Link to="/events" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faEarth} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Events</span>
                    </Link>
                    <Link to="/donations" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faGlobe} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Donations</span>
                    </Link>
                    <Link to="/members" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faUsers} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Members</span>
                    </Link>
                    <Link to="/reports" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faClipboardList} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Reports</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white">
                        <FontAwesomeIcon icon={faCog} size="lg" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Settings</span>
                    </Link>
                </nav>

                {/* Logout Button (Sticks to Bottom) */}
                <div className="px-4 pb-2 py-2 border-t border-red-500">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center justify-center gap-2 p-2 text-red-600 text-sm rounded hover:bg-red-100 w-full"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                        <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Logout</span>
                    </button>
                </div>


                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div className="fixed inset-0  opacity-50 md:hidden z-40" onClick={() => setIsMobileOpen(false)}></div>
                )}
            </div>

            <CustomModal open={isLogoutModalOpen} onCancel={() => setIsLogoutModalOpen(false)} title="Confirm Logout">
                <div className="flex flex-col gap-4">
                    <p>Are you sure you want to logout?</p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsLogoutModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Yes, Logout
                        </button>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default Sidebar;
