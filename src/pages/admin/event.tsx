import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";
import Modal from "../../components/Modal.tsx";
import { Form, Input, DatePicker, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { mockApi } from "../../services/mockApi";
import moment from "moment";

const Events: React.FC = () => {
    // State declarations
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [currentEvent, setCurrentEvent] = useState<any>(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch events from API
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const events = await mockApi.getEvents();
            setData(events);
            setError(null);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to load events. Please try again.");
            message.error("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    // Toggle sidebar handler
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Table column definitions
    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1,
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
            render: (text: string) => {
                try {
                    return <span>{new Date(text).toLocaleDateString()}</span>;
                } catch (err) {
                    return <span>{text}</span>;
                }
            },
            responsive: ['sm'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md'],
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex space-x-1 md:space-x-2">
                    <button
                        onClick={() => handleEdit(record)}
                        className="bg-sky-700 text-white p-1 md:p-2 rounded text-xs md:text-sm"
                        aria-label="Edit"
                    >
                        <span className="hidden md:inline">Edit</span>
                        <span className="inline md:hidden">Edit</span>
                    </button>
                    <button
                        onClick={() => handleDelete(record.key)}
                        className="bg-red-700 text-white p-1 md:p-2 rounded text-xs md:text-sm"
                        aria-label="Delete"
                    >
                        <span className="hidden md:inline">Delete</span>
                        <span className="inline md:hidden">Delete</span>
                    </button>
                </div>
            ),
        },
    ];

    // Handle Edit action
    const handleEdit = (event: any) => {
        setCurrentEvent(event);
        editForm.setFieldsValue({
            ...event,
            date: moment(event.date)
        });
        setIsEditModalOpen(true);
    };

    // Handle Delete action
    const handleDelete = async (key: string) => {
        try {
            setLoading(true);
            await mockApi.deleteEvent(key);
            message.success("Event deleted successfully");
            await fetchEvents(); // Refresh the events list
        } catch (err) {
            console.error("Error deleting event:", err);
            message.error("Failed to delete event");
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Event form submission
    const handleAddEvent = async (values: any) => {
        try {
            setLoading(true);
            const newEventData = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
            };

            await mockApi.addEvent(newEventData);
            message.success("Event added successfully");
            setIsModalOpen(false);
            form.resetFields();
            await fetchEvents(); // Refresh the events list
        } catch (err) {
            console.error("Error adding event:", err);
            message.error("Failed to add event");
        } finally {
            setLoading(false);
        }
    };

    // Handle Edit Event form submission
    const handleUpdateEvent = async (values: any) => {
        if (!currentEvent) return;

        try {
            setLoading(true);
            const updatedEventData = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
            };

            await mockApi.updateEvent(currentEvent.key, updatedEventData);
            message.success("Event updated successfully");
            setIsEditModalOpen(false);
            editForm.resetFields();
            await fetchEvents(); // Refresh the events list
        } catch (err) {
            console.error("Error updating event:", err);
            message.error("Failed to update event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar role="admin" />
            <div className="flex-1 w-full">
                <Topbar toggleSidebar={toggleSidebar} />
                <Breadcrumbs />

                <div className="p-2 sm:p-4 md:p-8 mt-16 md:mt-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-2 mt-6 sm:p-4 mb-4">
                        <h1 className="font-semibold text-lg md:text-xl mb-2 sm:mb-0">Church Event Management</h1>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                            <button
                                className="bg-sky-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center"
                                onClick={() => setIsModalOpen(true)}
                                disabled={loading}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                <span>Add Event</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        {error ? (
                            <div className="p-4 text-center text-red-500">{error}</div>
                        ) : (
                            <Table
                                title="Church Events"
                                columns={columns}
                                data={data}
                                loading={loading}
                            />
                        )}
                    </div>

                    {/* Add Event Modal */}
                    {isModalOpen && (
                        <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} title="Add Church Event">
                            <Form
                                form={form}
                                onFinish={handleAddEvent}
                                layout="vertical"
                                className="max-h-[80vh] overflow-y-auto"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Enter event name" />
                                    </Form.Item>
                                    <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Enter location" />
                                    </Form.Item>
                                    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Required' }]}>
                                        <DatePicker className="w-full" />
                                    </Form.Item>
                                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Required' }]}>
                                        <Input.TextArea placeholder="Enter event description" />
                                    </Form.Item>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-700 p-2 rounded"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-sky-700 text-white p-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? 'Adding...' : 'Add Event'}
                                    </button>
                                </div>
                            </Form>
                        </Modal>
                    )}

                    {/* Edit Event Modal */}
                    {isEditModalOpen && (
                        <Modal open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} title="Edit Church Event">
                            <Form
                                form={editForm}
                                onFinish={handleUpdateEvent}
                                layout="vertical"
                                className="max-h-[80vh] overflow-y-auto"
                                initialValues={currentEvent}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Enter event name" />
                                    </Form.Item>
                                    <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Enter location" />
                                    </Form.Item>
                                    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Required' }]}>
                                        <DatePicker className="w-full" />
                                    </Form.Item>
                                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Required' }]}>
                                        <Input.TextArea placeholder="Enter event description" />
                                    </Form.Item>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-700 p-2 rounded"
                                        onClick={() => setIsEditModalOpen(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-sky-700 text-white p-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </Form>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;