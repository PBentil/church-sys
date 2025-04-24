import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";

const MembersAnnouncements = () => {

    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1, // Show index starting from 1
            responsive: ['md'],
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <span>{new Date(text).toLocaleDateString()}</span>,
            responsive: ['sm'],
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            responsive: ['md'],
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
    ];


    const Announcements = [
        {
            key: '1',
            title: 'Tech Ministry Workshop',
            date: '2025-05-10',
            category: 'Ministry Update',
            content: 'Join us for a special workshop on AV and streaming tech in the main hall at 10 AM.',
        },
        {
            key: '2',
            title: 'Choir Auditions Open',
            date: '2025-06-01',
            category: 'Worship Team',
            content: 'Interested in joining the choir? Auditions will be held after second service every Sunday in June.',
        },
        {
            key: '3',
            title: 'Youth Camp 2025 Info',
            date: '2025-07-05',
            category: 'Youth Ministry',
            content: 'All teens and parents are invited to the orientation on July 5th. Camp details will be shared.',
        },
        {
            key: '4',
            title: 'Church Health Screening',
            date: '2025-08-20',
            category: 'Health & Wellness',
            content: 'Free health screening will be available after service on August 20th. Open to all members.',
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
                        <Table title="Announcements" columns={columns} data={Announcements} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MembersAnnouncements;