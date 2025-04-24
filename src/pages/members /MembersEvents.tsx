import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";

const MembersEvents = () => {

    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_ : any, __: any, index: number) => index + 1, // Adding 1 to start from 1 instead of 0
            responsive: ['md'],
        },
        {
            title: 'Event Name',
            dataIndex: 'eventName',
            key: 'eventName',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            responsive: ['sm'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <span>{new Date(text).toLocaleDateString()}</span>, // format date

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            responsive: ['sm'],
            // Truncate long descriptions
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
    ];



    const eventData = [
        {
            key: '1',
            eventName: 'Tech Conference 2025',
            location: 'New York',
            date: '2025-05-10',
            description: 'A conference about the latest trends in technology, AI, and software development.',
        },
        {
            key: '2',
            eventName: 'Music Festival 2025',
            location: 'Los Angeles',
            date: '2025-06-15',
            description: 'An annual music festival featuring top artists and new talent.',
        },
        {
            key: '3',
            eventName: 'Art Expo 2025',
            location: 'San Francisco',
            date: '2025-07-20',
            description: 'A showcase of modern art, photography, and sculpture from around the world.',
        },
        {
            key: '4',
            eventName: 'Health & Wellness Expo',
            location: 'Chicago',
            date: '2025-08-25',
            description: 'An expo focusing on health, fitness, wellness, and healthy living.',
        },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar role="member" />
            <div className="flex-1 w-full">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                }} />
                <Breadcrumbs />

                <div className="p-2 sm:p-4 md:p-8 mt-26 md:mt-24">
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <Table title="Events" columns={columns} data={eventData} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MembersEvents;