import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faHome,
    faEarth,
    faGlobe,
    faUsers,
    faClipboardList,
    faRightFromBracket, faCog,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./Modal";
import CustomDrawer from "./Drawer";
import Settings from "../pages/Settings";


type SidebarProps = {
    role: "admin" | "member";
};

const Sidebar = ({ role }: SidebarProps) => {
    const [isOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        window.location.href = "/login";
    };

    const handleLinkClick = () => {
        setIsMobileOpen(false);
    };

    const adminLinks = [
        { to: "/dashboard", label: "Dashboard", icon: faHome },
        { to: "/events", label: "Events", icon: faEarth },
        { to: "/donations", label: "Donations", icon: faGlobe },
        { to: "/members", label: "Members", icon: faUsers },
        { to: "/reports", label: "Reports", icon: faClipboardList },

    ];

    const memberLinks = [
        { to: "/MemberDashboard", label: "Dashboard", icon: faHome },
        { to: "/MembersEvents", label: "Events", icon: faClipboardList },
        {to: "/MembersDonations", label: "Donations", icon: faGlobe },
        { to: "/MembersAnnouncements", label: "Announcements", icon: faClipboardList },
        { to: "/ProfilePage", label: "Profile Management", icon: faCog },



    ];

    const links = role === "admin" ? adminLinks : memberLinks;

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
            <div
                className={`fixed top-0 left-0 h-full bg-white text-gray-600 shadow-lg z-50
        transition-all duration-300 ease-in-out flex flex-col justify-between
        ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"}
        ${isOpen ? "md:w-64" : "md:w-16"} md:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-sky-700">
                    <h1
                        className={`text-xl font-bold transition-all duration-300 p-1.5 ${
                            isOpen ? "opacity-100" : "opacity-0 hidden"
                        }`}
                    >
                        <span className="text-sky-700">Faith</span>Connect
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-4 px-4 mt-4 flex-1">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className="flex items-center gap-3 p-3 rounded hover:bg-sky-700 hover:text-white"
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={icon} size="lg" />
                            <span
                                className={`${
                                    isOpen ? "inline" : "hidden"
                                } transition-all duration-300`}
                            >
                {label}
              </span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 pb-2 py-2 border-t border-red-500">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center justify-center gap-2 p-2 text-red-600 text-sm rounded hover:bg-red-100 w-full"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                        <span
                            className={`${
                                isOpen ? "inline" : "hidden"
                            } transition-all duration-300`}
                        >
              Logout
            </span>
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}

            {/* Modals */}
            <CustomModal
                open={isLogoutModalOpen}
                onCancel={() => setIsLogoutModalOpen(false)}
                title="Confirm Logout"
            >
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

            <CustomDrawer
                open={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Settings"
            >
                <Settings />
            </CustomDrawer>
        </>
    );
};

export default Sidebar;
