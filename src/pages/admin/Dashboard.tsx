import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faChurch, faClipboardList, faGlobe, faUsers, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the mock API
import { mockApi } from "../../services/mockApi";

interface Stats {
    events: number;
    finances: number;
    members: number;
    attendance: number;
}

// Fallback data as a last resort
const fallbackStats: Stats = {
    events: 0,
    finances: 0,
    members: 0,
    attendance: 0
};

const Dashboard = () => {
    const [stats, setStats] = useState<Stats>(fallbackStats);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const chartData = [
        { name: "Events", value: stats.events },
        { name: "Finances", value: stats.finances },
        { name: "Members", value: stats.members },
        { name: "Attendance", value: stats.attendance },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // First try the real API
                try {
                    const response = await fetch("/api/stats");

                    // Check if response is OK before trying to parse JSON
                    if (!response.ok) {
                        throw new Error(`API responded with status: ${response.status}`);
                    }

                    const text = await response.text();
                    const data = JSON.parse(text);
                    setStats(data);
                    setError(null);
                    console.log("Using real API data");
                } catch (apiError) {
                    console.error("Real API failed:", apiError);

                    // If real API fails, fall back to mock API
                    console.log("Falling back to mock API");
                    const mockData = await mockApi.getStats();
                    setStats(mockData);
                    setError("Using demo data for development");
                }
            } catch (error) {
                console.error("All API attempts failed:", error);
                setError("Unable to load statistics. Using fallback data.");
                // Already using fallback data from initial state
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="w-full h-screen">
                <Topbar toggleSidebar={toggleSidebar} />
                <Breadcrumbs />

                {loading ? (
                    <div className="flex h-screen w-full items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-700"></div>
                            <p className="mt-4 text-sky-700 font-semibold">Loading dashboard...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-8 mt-24">
                            <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                            <p className="text-gray-500">Manage church activities here.</p>

                            {error && (
                                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mt-1 mr-2" />
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-5">
                            {[
                                { icon: faChurch, label: "Events", value: stats.events },
                                { icon: faGlobe, label: "Finances", value: stats.finances },
                                { icon: faUsers, label: "Members", value: stats.members },
                                { icon: faClipboardList, label: "Attendance", value: stats.attendance }
                            ].map((stat, index) => (
                                <div key={index} className="p-4 text-sky-700 rounded-lg bg-white shadow-md">
                                    <FontAwesomeIcon icon={stat.icon} className="mr-2 text-2xl" />
                                    <p className="text-lg font-bold">{stat.value}</p>
                                    <p className="text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="lg:flex justify-around p-5">
                            <div className="p-8 mt-8 bg-white shadow-md rounded-lg lg:w-2/3">
                                <h3 className="text-lg font-semibold mb-4 text-sky-700">Statistics Overview</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={chartData} barSize={50}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                                        <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 14 }} />
                                        <YAxis tick={{ fill: "#666", fontSize: 14 }} />
                                        <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
                                        <Legend />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0369A1" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="p-6 mt-8 bg-white shadow-md rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-sky-700">Calendar</h3>
                                <div className="flex justify-center">
                                    <Calendar onChange={(value) => setDate(value as Date)} value={date} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;