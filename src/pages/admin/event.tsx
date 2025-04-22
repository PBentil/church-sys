import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "../../components/Modal.tsx";
import { Form } from "antd";

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (index: number) => index + 1, // Adding 1 to start from 1 instead of 0
            responsive: ['md'],
        },
        {
            title: 'Event Name',
            dataIndex: 'eventName',
            key: 'eventName',
            responsive: ['xs'],
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
            responsive: ['sm'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md'],
            // Truncate long descriptions
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            responsive: ['xs'],
            render: (_: any, record: any) => (
                <div className="flex space-x-1 md:space-x-2">
                    <button
                        onClick={() => handleEdit(record)}
                        className="bg-sky-700 text-white p-1 md:p-2 rounded text-xs md:text-sm"
                        aria-label="Edit"
                    >
                        <FontAwesomeIcon icon={faEdit} className="mr-0 md:mr-1" />
                        <span className="hidden md:inline">Edit</span>
                    </button>
                    <button
                        onClick={() => handleDelete(record.key)}
                        className="bg-red-700 text-white p-1 md:p-2 rounded text-xs md:text-sm"
                        aria-label="Delete"
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-0 md:mr-1" />
                        <span className="hidden md:inline">Delete</span>
                    </button>
                </div>
            ),
        },
    ];

    // Handle Edit action (frontend only)
    const handleEdit = (event: any) => {
        alert(`Edit event: ${event.eventName}`);
        // In real case, you'd likely open a modal or navigate to an edit page
    };

    // Handle Delete action (frontend only)
    const handleDelete = (key: string) => {
        alert(`Deleted event with key: ${key}`);
    };

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
            <Sidebar role="admin" />
            <div className="flex-1 w-full">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                }} />
                <Breadcrumbs />

                <div className="p-2 sm:p-4 md:p-8 mt-16 md:mt-24">


                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-2 mt-6 sm:p-4 mb-4">
                        <h1 className="font-semibold text-lg md:text-xl mb-2 sm:mb-0">Event Management</h1>
                        <button
                            className="bg-sky-700 text-white px-3 py-2 rounded-lg text-sm flex items-center"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            <span>Add Event</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <Table title="Events" columns={columns} data={eventData} />
                    </div>

                    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} title="Add Event">
                        <Form
                            onSubmit={() => setIsModalOpen(false)}
                            layout="vertical"
                            className="max-h-[80vh] overflow-y-auto"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Form.Item label="Event Name" name="eventName" rules={[{required: true, message: "Required"}]}>
                                    <input type="text" className="border rounded-md p-2 w-full" placeholder="Enter event name" />
                                </Form.Item>
                                <Form.Item label="Location" name="location" rules={[{required: true, message: "Required"}]}>
                                    <input type="text" className="border rounded-md p-2 w-full" placeholder="Enter location" />
                                </Form.Item>
                                <Form.Item label="Date" name="date" rules={[{required: true, message: "Required"}]}>
                                    <input type="date" className="border rounded-md p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Description" name="description" rules={[{required: true, message: "Required"}]}>
                                    <textarea
                                        className="border rounded-md p-2 w-full h-24"
                                        placeholder="Enter event description"
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 p-2 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-sky-700 text-white p-2 rounded">
                                    Add Event
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Events;