import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal.tsx";
import {Form} from "antd";
import {useState} from "react";
import Table from "../../components/Table.tsx";
import SearchComplete from "../../components/SearchComplete.tsx";



const Members = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const membersData = [
        {
            key: '1',
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            role: 'Admin',
            address: '123 Main St, City, Country',
        },
        {
            key: '2',
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            gender: 'Female',
            role: 'Member',
            address: '456 Oak St, City, Country',
        },
        {
            key: '3',
            id: '3',
            firstName: 'Sam',
            lastName: 'Johnson',
            gender: 'Male',
            role: 'Moderator',
            address: '789 Pine St, City, Country',
        },
    ];

// Columns definition for the table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
    const handleEdit = (record: any) => {
        alert(`Edit Member: ${record.firstName} ${record.lastName}`);
        // Open a modal or handle logic for editing member here
        setIsModalOpen(true); // If you're opening a modal
    };

    // Handle Delete action (frontend only)
    const handleDelete = (key: string) => {
        alert(`Deleted member with key: ${key}`);
        // Add delete logic here
    };
    return (
        <div className="flex">
            <Sidebar />
            <div className=" w-full min-h-screen ">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-8 mt-24">
                    <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} title="Member Registration">
                        <Form onSubmit={()=>setIsModalOpen(true)} layout="vertical" >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Form.Item label="First Name" name="First_Name"  rules={[{required: true, message: "Required"}]}>
                                    <input type="text" className="border rounded-sm p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Last Name" name="Last_name"  rules={[{required: true, message: "Required"}]}>
                                    <input  type="text" className="border rounded-sm p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Email" name="Email"  rules={[{required: true, message: "Required"}]}>
                                    <input  type="email" className="border rounded-sm p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Phone Number" name="phone_number"  rules={[{required: true, message: "Required"}]}>
                                    <input  type="text" className="border rounded-sm p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Gender" name="gender"  rules={[{required: true, message: "Required"}]}>
                                    <select className="border rounded-sm p-2 w-full">
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </Form.Item>
                                <Form.Item label="Date Of Birth" name="Date"  rules={[{required: true, message: "Required"}]}>
                                    <input type="Date" className="border rounded-sm p-2 w-full"  />
                                </Form.Item>
                                <Form.Item label="Address" name="Address"  rules={[{required: true, message: "Required"}]}>
                                    <input  type="text" className="border rounded-sm p-2 w-full" />
                                </Form.Item>
                                <Form.Item label="Role" name="role"  rules={[{required: true, message: "Required"}]}>
                                    <select className="border rounded-sm p-2 w-full">
                                        <option value="">Select Role</option>
                                        <option value="Pastor">Pastor</option>
                                        <option value="Presiding">Presiding Elder</option>
                                        <option value="Elder">Elder</option>
                                        <option value="Deacon">Deacon</option>
                                        <option value="Deaconess">Deconess</option>
                                        <option value="Executive">Executive</option>
                                        <option value="member">Member</option>
                                    </select>
                                </Form.Item>
                            </div><br />
                            <div className="flex justify-end">
                                <button type="submit" className="bg-sky-700 text-white p-2 rounded ">Add Member</button>
                            </div>

                        </Form>
                    </Modal>
                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                        <h1 className="font-bold text-xl">Members Management</h1>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <SearchComplete placeholder="Search for members..." />
                            <button
                                className="bg-sky-700 text-white px-3 py-2 rounded-lg"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Members
                            </button>
                        </div>
                    </div>



                    {/* Members Table */}
                    <div className="mt-6">
                        <Table  data={membersData} columns={columns} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
