import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import Breadcrumbs from "../components/Breadcrumbs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import { faChurch, faClipboardList, faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
    function toggleSidebar(): void {
        throw new Error("Function not implemented.");
    }

    const [stats, setStats] = useState({ dioceses: 0, circuits: 0, members: 0, attendance: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/dashboard-stats");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);


    // Prepare data for the chart
    const chartData = [
        { name: "Dioceses", value: stats.dioceses, color: "#4F46E5" },
        { name: "Circuits", value: stats.circuits, color: "#22C55E" },
        { name: "Members", value: stats.members, color: "#EAB308" },
        { name: "Attendance", value: stats.attendance, color: "#EF4444" },
    ];



    const [date, setDate] = useState(new Date());

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="lg:ml-64 w-full h-screen ">
                <Topbar toggleSidebar={toggleSidebar} />
                <Breadcrumbs />
                <div className="p-8 mt-24">
                    <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                    <p className="text-gray-500">Manage church activities here.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-4 text-sky-700  rounded-lg shadow-md">
                        <FontAwesomeIcon icon={faChurch} className="mr-2 text-2xl" />
                        <p className="text-lg font-bold">{stats.dioceses}</p>
                        <p className="text-sm">Dioceses</p>
                    </div>
                    <div className="p-4 text-sky-700  rounded-lg shadow-md">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-2xl" />
                        <p className="text-lg font-bold">{stats.circuits}</p>
                        <p className="text-sm">Circuits</p>
                    </div>
                    <div className="p-4 text-sky-700  rounded-lg shadow-md">
                        <FontAwesomeIcon icon={faUsers} className="mr-2 text-2xl" />
                        <p className="text-lg font-bold">{stats.members}</p>
                        <p className="text-sm">Members</p>
                    </div>
                    <div className="p-4 text-sky-700 rounded-lg shadow-md">
                        <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-2xl" />
                        <p className="text-lg font-bold">{stats.attendance}</p>
                        <p className="text-sm">Attendance</p>
                    </div>
                </div>

                {/* Graph Section and date */}
                <div className="lg:flex justify-around">
                    <div className="p-8 mt-8 bg-white shadow-md rounded-lg lg:w-2/3 ">
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
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="custom-calendar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
