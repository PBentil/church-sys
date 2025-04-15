import Sidebar from "../components/Sidebar.tsx";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 text-white bg-sky-700 p-2 rounded"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
                {isMobileSidebarOpen ? (
                    <span className="text-xl">×</span>
                ) : (
                    <span className="text-xl">≡</span>
                )}
            </button>

            {/* Sidebar (Responsive) */}
            <div
                className={`${
                    isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-0 left-0 h-full bg-white text-gray-600 shadow-lg z-50 transition-all duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:block`}
            >
                <Sidebar />
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gray-100 w-full h-screen">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
