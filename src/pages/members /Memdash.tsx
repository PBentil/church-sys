import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";

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
            <div className="flex justify-between gap-5">

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
        </div>
        </div>
    );
};

export default MemberDashboard;
