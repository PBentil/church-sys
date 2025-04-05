import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Modal from "../../components/Modal.tsx";
import { Form } from "antd";


const Events= () => {
const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: ( index: number) => index + 1, // Adding 1 to start from 1 instead of 0
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
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(record)}
                        className="bg-sky-700 text-white p-2 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(record.key)}
                        className="bg-red-700 text-white p-2 rounded"
                    >
                        Delete
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
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full h-screen">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                } } />
                <Breadcrumbs />
                <div className="p-8 mt-24" >
                    <div className="flex items-center justify-between w-full p-4">
                        <h1 className="font-semibold text-xl">Welcome to event sections </h1>
                        <button className="bg-sky-700 text-white lg:p-2 rounded-lg" onClick={()=>setIsModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Add Event</button>
                    </div>
                    <div>
                        <Table title="Events" columns={columns} data={eventData} />
                    </div>
                    <div>
                        <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} title="Add Event">
                           <Form onSubmit={()=>setIsModalOpen(true)} layout="vertical" >
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <Form.Item label="Event" name="Event"  rules={[{required: true, message: "Required"}]}>
                                   <input type="text" className="border rounded-sm p-2 w-full" />
                               </Form.Item>
                               <Form.Item label="Location" name="Location"  rules={[{required: true, message: "Required"}]}>
                                   <input  type="text" className="border rounded-sm p-2 w-full" />
                               </Form.Item>
                               <Form.Item label="Date" name="Date"  rules={[{required: true, message: "Required"}]}>
                                   <input type="Date" className="border rounded-sm p-2 w-full"  />
                               </Form.Item>
                                   <Form.Item label="Description" name="Tags"  rules={[{required: true, message: "Required"}]}>
                                       <input className="border rounded-sm p-2 w-full" />
                                   </Form.Item>
                               </div><br />
                               <div className="flex justify-end">
                                   <button type="submit" className="bg-sky-700 text-white p-2 rounded ">Add Event</button>
                               </div>

                           </Form>
                        </Modal>

                    </div>
                </div>


            </div>

        </div>
    );
}
export default Events;