import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal.tsx";
import { DatePicker, Form, message, Popconfirm, Alert } from "antd";
import { useEffect, useState } from "react";
import Table from "../../components/Table.tsx";
import SearchComplete from "../../components/SearchComplete.tsx";
import { mockApi } from "../../services/mockApi.ts";
import moment from "moment";

interface Member {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    role: string;
    date: string;
    address: string;
}

// Email validation regex pattern
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Phone validation regex pattern (basic international format)
const phonePattern = /^\+?[0-9\s\-()]{10,20}$/;

const Members = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Member[]>([]);
    const [filteredData, setFilteredData] = useState<Member[]>([]);
    const [currentMember, setCurrentMember] = useState<Member | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
        fetchMembers();
    }, []);

    // Effect to handle search filtering
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredData(data);
            return;
        }

        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = data.filter(member =>
            member.firstName.toLowerCase().includes(lowercasedSearch) ||
            member.lastName.toLowerCase().includes(lowercasedSearch) ||
            member.email.toLowerCase().includes(lowercasedSearch) ||
            member.phoneNumber.includes(lowercasedSearch) ||
            member.role.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const members = await mockApi.getMembers();
            setData(members);
            setFilteredData(members);
            setError(null);
        } catch (err) {
            console.error("Error fetching members:", err);
            setError("Failed to load members. Please try again later.");
            message.error("Failed to load members");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member: Member) => {
        setCurrentMember(member);
        editForm.setFieldsValue({
            ...member,
            date: moment(member.date),
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = async (key: string) => {
        try {
            setLoading(true);
            await mockApi.deleteMember(key);
            message.success("Member deleted successfully");
            await fetchMembers();
        } catch (err) {
            console.error("Error deleting member:", err);
            message.error("Failed to delete member");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (values: any) => {
        try {
            setLoading(true);
            const newMember = {
                ...values,
                date: values.date.format("YYYY-MM-DD"),
            };
            await mockApi.addMember(newMember);
            message.success("Member added successfully");
            form.resetFields();
            setIsModalOpen(false);
            await fetchMembers();
        } catch (err) {
            console.error("Error adding member:", err);
            message.error("Failed to add member");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateMember = async (values: any) => {
        if (!currentMember) return;

        try {
            setLoading(true);
            const updated = {
                ...values,
                date: values.date.format("YYYY-MM-DD"),
            };
            await mockApi.updateMember(currentMember.key, updated);
            message.success("Member updated successfully");
            editForm.resetFields();
            setIsEditModalOpen(false);
            await fetchMembers();
        } catch (err) {
            console.error("Error updating member:", err);
            message.error("Failed to update member");
        } finally {
            setLoading(false);
        }
    };

 
const handleSearch = (
    value: string) => {
    setSearchTerm(value);
};

    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Full Name',
            key: 'fullName',
            render: (_: any, record: Member) => `${record.firstName} ${record.lastName}`,
            sorter: (a: Member, b: Member) => {
                const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                return nameA.localeCompare(nameB);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: Member, b: Member) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
            ],
            onFilter: (value: string, record: Member) => record.gender === value,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Pastor', value: 'Pastor' },
                { text: 'Presiding Elder', value: 'Presiding' },
                { text: 'Elder', value: 'Elder' },
                { text: 'Deacon', value: 'Deacon' },
                { text: 'Deaconess', value: 'Deaconess' },
                { text: 'Executive', value: 'Executive' },
                { text: 'Member', value: 'Member' },
            ],
            onFilter: (value: string, record: Member) => record.role === value,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => moment(text).format("YYYY-MM-DD"),
            sorter: (a: Member, b: Member) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text: string) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Member) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(record)}
                        className="bg-sky-700 text-white p-2 rounded"
                        aria-label={`Edit ${record.firstName} ${record.lastName}`}
                    >
                        Edit
                    </button>
                    <Popconfirm
                        title="Delete member"
                        description={`Are you sure you want to delete ${record.firstName} ${record.lastName}?`}
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "bg-red-600" }}
                    >
                        <button
                            className="bg-red-700 text-white p-2 rounded"
                            aria-label={`Delete ${record.firstName} ${record.lastName}`}
                        >
                            Delete
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    // Form validation rules
    const emailRules = [
        { required: true, message: 'Email is required' },
        { pattern: emailPattern, message: 'Please enter a valid email address' }
    ];

    const phoneRules = [
        { required: true, message: 'Phone number is required' },
        { pattern: phonePattern, message: 'Please enter a valid phone number' }
    ];

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="w-full min-h-screen">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />
                <div className="p-8 mt-24">
                    {/* Add Member Modal */}
                    <Modal
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        title="Member Registration"
                        aria-labelledby="add-member-modal-title"
                    >
                        <h2 id="add-member-modal-title" className="sr-only">Member Registration Form</h2>
                        <Form form={form} layout="vertical" onFinish={handleAddMember}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
                                    <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
                                    <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={emailRules}>
                                    <input type="email" className="border rounded-sm p-2 w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Phone Number" name="phoneNumber" rules={phoneRules}>
                                    <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Gender is required' }]}>
                                    <select className="border rounded-sm p-2 w-full" aria-required="true">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </Form.Item>
                                <Form.Item label="Date of Birth" name="date" rules={[{ required: true, message: 'Date of birth is required' }]}>
                                    <DatePicker className="w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Address is required' }]}>
                                    <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                </Form.Item>
                                <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role is required' }]}>
                                    <select className="border rounded-sm p-2 w-full" aria-required="true">
                                        <option value="">Select Role</option>
                                        <option value="Pastor">Pastor</option>
                                        <option value="Presiding">Presiding Elder</option>
                                        <option value="Elder">Elder</option>
                                        <option value="Deacon">Deacon</option>
                                        <option value="Deaconess">Deaconess</option>
                                        <option value="Executive">Executive</option>
                                        <option value="Member">Member</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 p-2 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={loading}
                                    aria-label="Cancel adding member"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-sky-700 text-white p-2 rounded"
                                    disabled={loading}
                                    aria-label="Add new member"
                                >
                                    {loading ? 'Adding...' : 'Add Member'}
                                </button>
                            </div>
                        </Form>
                    </Modal>

                    {/* Edit Member Modal */}
                    {isEditModalOpen && (
                        <Modal
                            open={isEditModalOpen}
                            onCancel={() => setIsEditModalOpen(false)}
                            title="Edit Church Member"
                            aria-labelledby="edit-member-modal-title"
                        >
                            <h2 id="edit-member-modal-title" className="sr-only">Edit Member Form</h2>
                            <Form
                                form={editForm}
                                onFinish={handleUpdateMember}
                                layout="vertical"
                                className="max-h-[80vh] overflow-y-auto"
                                initialValues={currentMember}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
                                        <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
                                        <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email" rules={emailRules}>
                                        <input type="email" className="border rounded-sm p-2 w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Phone Number" name="phoneNumber" rules={phoneRules}>
                                        <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Gender is required' }]}>
                                        <select className="border rounded-sm p-2 w-full" aria-required="true">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </Form.Item>
                                    <Form.Item label="Date of Birth" name="date" rules={[{ required: true, message: 'Date of birth is required' }]}>
                                        <DatePicker className="w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Address is required' }]}>
                                        <input className="border rounded-sm p-2 w-full" aria-required="true" />
                                    </Form.Item>
                                    <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role is required' }]}>
                                        <select className="border rounded-sm p-2 w-full" aria-required="true">
                                            <option value="">Select Role</option>
                                            <option value="Pastor">Pastor</option>
                                            <option value="Presiding">Presiding Elder</option>
                                            <option value="Elder">Elder</option>
                                            <option value="Deacon">Deacon</option>
                                            <option value="Deaconess">Deaconess</option>
                                            <option value="Executive">Executive</option>
                                            <option value="Member">Member</option>
                                        </select>
                                    </Form.Item>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-700 p-2 rounded"
                                        onClick={() => setIsEditModalOpen(false)}
                                        disabled={loading}
                                        aria-label="Cancel editing member"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-sky-700 text-white p-2 rounded"
                                        disabled={loading}
                                        aria-label="Save member changes"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </Form>
                        </Modal>
                    )}

                    {/* Header and Actions */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                        <h1 className="font-bold text-xl">Members Management</h1>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <SearchComplete
                                placeholder="Search for members..."
                                onSearch={handleSearch}
                                aria-label="Search members by name, email, role or phone"
                            />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-sky-700 text-white px-3 py-2 rounded-lg"
                                aria-label="Add new member"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Member
                            </button>
                        </div>
                    </div>

                    {/* Error display */}
                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            className="mt-4"
                        />
                    )}

                    {/* Members Table */}
                    <div className="mt-6">
                        <Table
                            data={filteredData}
                            columns={columns}
                            loading={loading}
                            aria-label="Church members table"
                        />
                        {filteredData.length === 0 && !loading && (
                            <div className="text-center p-4 bg-gray-50 rounded-md mt-4">
                                {searchTerm ? 'No members found matching your search.' : 'No members found.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;