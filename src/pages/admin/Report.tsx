import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import SearchComplete from "../../components/SearchComplete.tsx";
import { faChurch, faClipboardList, faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Table from "../../components/Table.tsx";

interface Stats {
    events: number;
    finances: number;
    members: number;
    attendance: number;
}

const Report = () => {
    const reportColumns = [
        {
            title: 'Report Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['md'],
        },
        {
            title: 'Amount (GHS)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number | undefined) => amount ? `GHS ${amount}` : '—',
            responsive: ['md'],
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            responsive: ['md'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            responsive: ['md'],
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            responsive: ['md'],
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            responsive: ['md'],
            render: (status: string) => (
                <span className={`px-2 py-1 rounded text-white ${status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {status}
                </span>
            ),

        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="flex gap-2">
                    <button className="bg-sky-700 text-white px-3 py-1 rounded">View</button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded">Download</button>
                </div>
            ),
        },
    ];

    const reportData = [
        {
            key: '1',
            type: 'Donation',
            name: 'John Doe',
            amount: 100,
            purpose: 'Building Fund',
            date: '2025-04-01',
            method: 'Cash',
            status: 'Completed',
        },
        {
            key: '2',
            type: 'Donation',
            name: 'Jane Smith',
            amount: 250,
            purpose: 'Tithe',
            date: '2025-04-03',
            method: 'Mobile Money',
            status: 'Completed',
        },
        {
            key: '3',
            type: 'Member',
            name: 'Samuel Johnson',
            amount: undefined,
            purpose: '-',
            date: '2025-03-20',
            method: '-',
            status: 'Active',
        },
        {
            key: '4',
            type: 'Event',
            name: 'Youth Conference',
            amount: undefined,
            purpose: '-',
            date: '2025-04-10',
            method: '-',
            status: 'Upcoming',
        },
    ];

    const [stats] = useState<Stats>({
        events: 0,
        finances: 0,
        members: 0,
        attendance: 0,
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar role="admin" />
            <div className="flex-1 w-full ">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                    <div className="p-8 mt-24">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                        <h1 className="font-bold text-2xl mt-2">Reports</h1>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
                            <SearchComplete placeholder="Search for reports..." />

                            <select className="border rounded-sm p-2 w-full sm:w-56">
                                <option value="">Select...</option>
                                <option value="Title">Title</option>
                                <option value="Offering">Offering</option>
                                <option value="Contribution">Contribution</option>
                            </select>

                            <button className="bg-sky-700 text-white px-4 py-2 rounded-sm w-full sm:w-auto">
                                Download Report
                            </button>
                        </div>
                    </div>

                    <br /><br />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full ">
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
                    <br />
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <Table title="Report List" columns={reportColumns} data={reportData} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Report;
