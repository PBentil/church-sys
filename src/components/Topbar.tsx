import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faCog, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import CustomModal from "./Modal.tsx";
import CustomDrawer from "./Drawer.tsx";
import Settings from "../pages/Settings.tsx";

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const [isOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        window.location.href = '/login';
    };

    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const formatPageTitle = (pathname: string) => {
        const paths = pathname.split("/").filter((x) => x);
        return paths.length ? paths[paths.length - 1].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Dashboard";
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 w-full md:w-[calc(100%-256px)] md:ml-64 transition-all z-40">
            <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <h1 className="text-lg md:text-xl font-semibold text-sky-700 mx-auto md:mx-0 capitalize">
                {formatPageTitle(location.pathname)}
            </h1>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-gray-500 text-lg focus:outline-none"
                >
                    <FontAwesomeIcon icon={faUser} />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                        <button className="flex items-center gap-3 p-3 hover:bg-sky-700 hover:text-white text-left rounded w-full">
                            <FontAwesomeIcon icon={faUser} />
                            <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Profile</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsSettingsOpen(true);
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-sky-700 hover:text-white text-left rounded w-full"
                        >
                            <FontAwesomeIcon icon={faCog} />
                            <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Settings</span>
                        </button>
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="flex items-center gap-3 p-3 hover:bg-red-600 hover:text-white text-left rounded w-full"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                            <span className={`${isOpen ? "inline" : "hidden"} transition-all duration-300`}>Logout</span>
                        </button>
                    </div>
                )}



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

                <CustomDrawer
                    open={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    title="Settings"
                >
                    <Settings />
                </CustomDrawer>
            </div>
        </div>
    );
};

export default Topbar;
