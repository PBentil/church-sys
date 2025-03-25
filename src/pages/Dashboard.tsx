import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import Breadcrumbs from "../components/Breadcrumbs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { faChurch, faClipboardList, faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
    const [stats, setStats] = useState<{ dioceses: number; circuits: number; members: number; attendance: number }>({
        dioceses: 0,
        circuits: 0,
        members: 0,
        attendance: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [date, setDate] = useState(new Date());

    // useEffect(() => {
    //     const fetchStats = async () => {
    //         try {
    //             const response = await fetch("http://localhost:5001/api/dashboard-stats");
    //             if (!response.ok) throw new Error("Failed to fetch data");
    //             const data = await response.json();
                
    //             if (!data || typeof data !== "object") {
    //                 throw new Error("Invalid data format");
    //             }
                
    //             setStats({
    //                 dioceses: data.dioceses || 0,
    //                 circuits: data.circuits || 0,
    //                 members: data.members || 0,
    //                 attendance: data.attendance || 0,
    //             });
    //         } catch (err) {
    //             setError("Error loading dashboard stats");
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchStats();
    // }, []);

    // if (loading) return <p className="text-center mt-10">Loading...</p>;
    // if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    const chartData = [
        { name: "Dioceses", value: stats.dioceses, color: "#4F46E5" },
        { name: "Circuits", value: stats.circuits, color: "#22C55E" },
        { name: "Members", value: stats.members, color: "#EAB308" },
        { name: "Attendance", value: stats.attendance, color: "#EF4444" },
    ];

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full h-screen">
                <Topbar toggleSidebar={() => {}} />
                <Breadcrumbs />
                <div className="p-8 mt-24">
                    <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                    <p className="text-gray-500">Manage church activities here.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ml-8">
                    {[{ icon: faChurch, label: "Dioceses", value: stats.dioceses },
                      { icon: faGlobe, label: "Circuits", value: stats.circuits },
                      { icon: faUsers, label: "Members", value: stats.members },
                      { icon: faClipboardList, label: "Attendance", value: stats.attendance }
                    ].map((stat, index) => (
                        <div key={index} className="p-4 text-sky-700 rounded-lg shadow-md">
                            <FontAwesomeIcon icon={stat.icon} className="mr-2 text-2xl" />
                            <p className="text-lg font-bold">{stat.value}</p>
                            <p className="text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="lg:flex justify-around">
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
            </div>
        </div>
    );
};

export default Dashboard;
