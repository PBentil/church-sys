import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Modal from "../../components/Modal.tsx";
import {Form} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList, faCog, faPlus} from "@fortawesome/free-solid-svg-icons";
import CustomDrawer from "../../components/Drawer.tsx";
import Settings from "../Settings.tsx";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";



interface Donation {
    date: string;
    amount: number;
}

interface Event {
    title: string;
    date: string;
    location: string;
}



const MemberDashboard = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);



    const [stats] = useState({
        events: 10,
        finances: 8,
        members: 20,
        attendance:15,
    });

    const chartData = [
        { name: "Events", value: stats.events },
        { name: "Donations", value: stats.finances },
        { name: "Participations", value: stats.members },
        { name: "Attendance", value: stats.attendance },
    ];



    useEffect(() => {
        // Simulate fetch from API
        setDonations([
            { date: "2025-04-10", amount: 50 },
            { date: "2025-03-25", amount: 30 },
        ]);

        setEvents([
            { title: "Easter Service", date: "2025-04-27", location: "Main Hall" },
            { title: "Youth Prayer Night", date: "2025-05-03", location: "Youth Chapel" },
        ]);
    }, []);

    return (
        <div className="p-6 space-y-6">
            <Sidebar role="member" />
            <div className="flex justify-between items-center">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                } } />
                <Breadcrumbs />
            </div>
            <div className="mt-20">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-gray-600">Here’s what’s coming up in your church life.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">

            {/* Upcoming Events */}
            <div className="bg-white p-4 rounded shadow-md w-full">
                <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
                {events.length === 0 ? (
                    <p className="text-gray-500">No events found.</p>
                ) : (
                    <ul className="space-y-2">
                        {events.map((event, index) => (
                            <li key={index} className="border-b pb-2">
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-gray-500">
                                    {event.date} @ {event.location}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Donations */}
            <div className="bg-white p-4 rounded shadow-md w-full">
                <h2 className="text-lg font-semibold mb-2">Your Donations</h2>
                {donations.length === 0 ? (
                    <p className="text-gray-500">No donation history yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {donations.map((donation, index) => (
                            <li key={index} className="flex justify-between text-sm">
                                <span>{donation.date}</span>
                                <span className="text-green-600 font-medium">GHS {donation.amount}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Announcements */}
            <div className="bg-white p-4 rounded shadow-md w-full">
                <h2 className="text-lg font-semibold mb-2">Announcements</h2>
                <p className="text-sm text-gray-700">
                    - Fasting and prayer starts on Monday.<br />
                    - Bible Study every Wednesday @ 6 PM.
                </p>
            </div>
                {/* Quick Links */}
                <div className="bg-white p-4 rounded shadow-md w-full">
                    <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/MembersAnnouncements" className="text-sky-700 hover:underline">
                               <FontAwesomeIcon icon={faClipboardList} /> View Announcements
                            </a>
                        </li>
                        <li>
                            <button
                                className="text-sky-700 hover:underline"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Donations
                            </button>
                        </li>
                        <li>
                            <a href="/MembersEvents" className="text-sky-700 hover:underline">
                                <FontAwesomeIcon icon={faClipboardList} /> View Events
                            </a>
                        </li>
                        <li>
                            <a href="/ProfilePage" className="text-sky-700 hover:underline">
                                <FontAwesomeIcon icon={faCog} /> Profile Management
                            </a>
                        </li>
                    </ul>
                </div>

                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
                        onClick={() => setIsMobileOpen(false)}
                    ></div>
                )}

                <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} title="Donation">
                    <Form onSubmit={()=>setIsModalOpen(true)} layout="vertical" >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="Donar Name" name="Donar_Name"  rules={[{required: true, message: "Required"}]}>
                                <input type="text" className="border rounded-sm p-2 w-full" />
                            </Form.Item>
                            <Form.Item label="Amount" name="Amount"  rules={[{required: true, message: "Required"}]}>
                                <input  type="text" className="border rounded-sm p-2 w-full" />
                            </Form.Item>
                            <Form.Item label="Date" name="Date"  rules={[{required: true, message: "Required"}]}>
                                <input  type="date" className="border rounded-sm p-2 w-full" />
                            </Form.Item>
                            <Form.Item label="Method" name="Method"  rules={[{required: true, message: "Required"}]}>
                                <select className="border rounded-sm p-2 w-full">
                                    <option value="">Select Method...</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Mobile_Money">Mobile Money</option>
                                    <option value="Bank_Transfer">Transfer</option>
                                </select>
                            </Form.Item>
                            <Form.Item label="Purpose" name="Purpose"  rules={[{required: true, message: "Required"}]}>
                                <select className="border rounded-sm p-2 w-full">
                                    <option value="">Select...</option>
                                    <option value="Title">Title</option>
                                    <option value="Offering">Offering</option>
                                    <option value="Contribution">Contribution</option>
                                </select>
                            </Form.Item>
                            <Form.Item label="Reference" name="Reference"  rules={[{required: true, message: "Required"}]}>
                                <input  type="text" className="border rounded-sm p-2 w-full" />
                            </Form.Item>

                        </div><br />
                        <div className="flex justify-end">
                            <button type="submit" className="bg-sky-700 text-white p-2 rounded ">Add Donation</button>
                        </div>

                    </Form>
                </Modal>


                <CustomDrawer
                    open={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    title="Settings"
                >
                    <Settings />
                </CustomDrawer>


        </div>

            <div className="p-8 mt-8 lg:bg-white shadow-md rounded-lg w-full hidden md:block ">
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
        </div>
    );
};

export default MemberDashboard;
