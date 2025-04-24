import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal.tsx";
import {Form} from "antd";
import {useState} from "react";
import Table from "../../components/Table.tsx";


const MembersDonations = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const Donations = [
        {
            key: '1',
            amount: 100,
            date: '2025-04-01',
            method: 'Cash',
            purpose: 'Building Fund',
            reference: 'DON12345',
        },
        {
            key: '2',
            amount: 250,
            date: '2025-04-03',
            method: 'Mobile Money',
            purpose: 'Tithe',
            reference: 'DON67890',
        },
    ];

// Columns definition for the table
    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1,
            responsive: ['md'],
        },
        {
            title: 'Amount (₵)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `₵${amount}`, // formats amount nicely
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
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            responsive: ['md'],
        },

    ];


    return (
        <div className="flex">
            <Sidebar role="member"/>
            <div className=" w-full min-h-screen ">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-8 lg:mt-20 mt-20">
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
                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                        <h1 className="font-bold text-xl">Donations Management</h1>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <button
                                className="bg-sky-700 text-white px-3 py-2 rounded-lg"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Donations
                            </button>
                        </div>
                    </div>
                    <div className="p-2 sm:p-4 md:p-8">
                        <div className="overflow-x-auto bg-white rounded-lg shadow ">
                            <Table title="Your Donations" columns={columns} data={Donations} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MembersDonations;
