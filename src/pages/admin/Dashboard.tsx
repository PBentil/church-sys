import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faChurch, faClipboardList, faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Stats {
    events: number;
    finances: number;
    members: number;
    attendance: number;
}

const Dashboard = () => {

    const [stats, setStats] = useState<Stats>({
        events: 0,
        finances: 0,
        members: 0,
        attendance: 0,
    });

    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);

    const chartData = [
        { name: "Events", value: stats.events, color: "#4F46E5" },
        { name: "Finances", value: stats.finances, color: "#22C55E" },
        { name: "Members", value: stats.members, color: "#EAB308" },
        { name: "Attendance", value: stats.attendance, color: "#EF4444" },
    ];


    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // Replace with actual API call
                const response = await fetch("/api/stats");
                const data: Stats = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-screen  ">
                <Topbar toggleSidebar={() => {}} />
                <Breadcrumbs />
                <div className="p-8 mt-24 ">
                    <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                    <p className="text-gray-500">Manage church activities here.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-5">
                    {[{ icon: faChurch, label: "Events", value: stats.events },
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
