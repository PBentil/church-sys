import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal.tsx";
import { Form, notification, Tooltip } from "antd";
import Table from "../../components/Table.tsx";
import { mockApi } from "../../services/mockApi";

interface DonationRecord {
    key: string;
    donorName: string;
    amount: number;
    date: string;
    method: string;
    purpose: string;
    reference: string;
    memberId?: string | null;
}

interface FilterState {
    donorName: string;
    minAmount: string;
    maxAmount: string;
    startDate: string;
    endDate: string;
    method: string;
    purpose: string;
}

interface StatsData {
    totalAmount: number;
    donationCount: number;
    methodTotals?: Record<string, number>;
}

const Donations: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentDonation, setCurrentDonation] = useState<DonationRecord | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterState>({
        donorName: "",
        minAmount: "",
        maxAmount: "",
        startDate: "",
        endDate: "",
        method: "",
        purpose: "",
    });

    const [donations, setDonations] = useState<DonationRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<string | boolean>(false);
    const [members, setMembers] = useState<any[]>([]); // For donor selection
    const [stats, setStats] = useState<StatsData | null>(null);

    const formRef = useRef<any>(null);

    // Fetch donations data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [donationsData, membersData, statsData] = await Promise.all([
                    mockApi.getDonations(),
                    mockApi.getMembers(),
                    mockApi.getDonationStats()
                ]);

                setDonations(donationsData);
                setMembers(membersData);
                setStats(statsData);
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "Failed to load donations data. Please try again."
                });
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter donations based on search and filter criteria
    const filteredDonations = donations.filter(donation => {
        // Search filter across multiple fields
        const searchLower = searchText.toLowerCase();
        const matchesSearch = searchText === "" ||
            donation.donorName.toLowerCase().includes(searchLower) ||
            donation.reference.toLowerCase().includes(searchLower) ||
            donation.purpose.toLowerCase().includes(searchLower) ||
            donation.method.toLowerCase().includes(searchLower);

        // Advanced filters
        const matchesDonorName = !filters.donorName ||
            donation.donorName.toLowerCase().includes(filters.donorName.toLowerCase());

        const matchesMinAmount = !filters.minAmount ||
            donation.amount >= parseFloat(filters.minAmount);

        const matchesMaxAmount = !filters.maxAmount ||
            donation.amount <= parseFloat(filters.maxAmount);

        const matchesStartDate = !filters.startDate ||
            new Date(donation.date) >= new Date(filters.startDate);

        const matchesEndDate = !filters.endDate ||
            new Date(donation.date) <= new Date(filters.endDate);

        const matchesMethod = !filters.method ||
            donation.method === filters.method;

        const matchesPurpose = !filters.purpose ||
            donation.purpose === filters.purpose;

        return matchesSearch && matchesDonorName && matchesMinAmount &&
            matchesMaxAmount && matchesStartDate && matchesEndDate &&
            matchesMethod && matchesPurpose;
    });

    const resetFilters = () => {
        setFilters({
            donorName: "",
            minAmount: "",
            maxAmount: "",
            startDate: "",
            endDate: "",
            method: "",
            purpose: "",
        });
        setFilterVisible(false);
    };

    const uniqueMethods = [...new Set(donations.map(item => item.method))];
    const uniquePurposes = [...new Set(donations.map(item => item.purpose))];

    const columns = [
        {
            title: 'No.',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1,
            responsive: ['md'],
        },
        {
            title: 'Donor Name',
            dataIndex: 'donorName',
            key: 'donorName',
            sorter: (a: DonationRecord, b: DonationRecord) => a.donorName.localeCompare(b.donorName),
        },
        {
            title: 'Amount (₵)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `₵${amount.toLocaleString()}`,
            sorter: (a: DonationRecord, b: DonationRecord) => a.amount - b.amount,
            responsive: ['md'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a: DonationRecord, b: DonationRecord) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
            responsive: ['sm'],
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            filters: uniqueMethods.map(method => ({ text: method, value: method })),
            onFilter: (value: any, record: DonationRecord) => record.method === value,
            responsive: ['sm'],
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            filters: uniquePurposes.map(purpose => ({ text: purpose, value: purpose })),
            onFilter: (value: any, record: DonationRecord) => record.purpose === value,
            responsive: ['md'],
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
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
            render: (_: any, record: DonationRecord) => (
                <div className="flex space-x-2">
                    <Tooltip title="Edit">
                        <button
                            onClick={() => handleEdit(record)}
                            className="bg-sky-700 text-white p-2 rounded hover:bg-sky-800 transition-colors"
                            aria-label="Edit donation"
                            disabled={deleting === record.key}
                        >
                            <span>Edit</span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <button
                            onClick={() => handleDelete(record.key)}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                            aria-label="Delete donation"
                            disabled={deleting === record.key}
                        >
                            {deleting === record.key ? (
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            ) : (
                                <span>Delete</span>
                            )}
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const handleEdit = (record: DonationRecord) => {
        setCurrentDonation(record);
        setIsEditMode(true);
        setIsModalOpen(true);

        // Set form values after modal opens
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.setFieldsValue({
                    donorName: record.donorName,
                    amount: record.amount,
                    date: record.date,
                    method: record.method,
                    purpose: record.purpose,
                    reference: record.reference,
                    memberId: record.memberId
                });
            }
        }, 100);
    };

    const handleDelete = async (key: string) => {
        if (window.confirm(`Are you sure you want to delete this donation record?`)) {
            setDeleting(key);
            try {
                await mockApi.deleteDonation(key);

                // Update local state
                setDonations(donations.filter(item => item.key !== key));

                notification.success({
                    message: "Success",
                    description: "Donation deleted successfully."
                });
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "Failed to delete donation. Please try again."
                });
                console.error("Error deleting donation:", error);
            } finally {
                setDeleting(false);
            }
        }
    };

    interface DonationFormValues {
        donorName: string;
        amount: string;
        date: string;
        method: string;
        purpose: string;
        reference?: string;
        memberId?: string | null;
    }

    const handleAddOrEdit = async (values: DonationFormValues) => {
        setSubmitting(true);

        try {
            const donationData = {
                donorName: values.donorName,
                amount: parseFloat(values.amount),
                date: values.date,
                method: values.method,
                purpose: values.purpose,
                reference: values.reference || "",
                memberId: values.memberId || null
            };

            if (isEditMode && currentDonation) {
                // Handle edit
                const updated = await mockApi.updateDonation(currentDonation.key, donationData);

                // Update in local state
                setDonations(donations.map(item =>
                    item.key === currentDonation.key ? updated : item
                ));

                notification.success({
                    message: "Success",
                    description: "Donation updated successfully."
                });
            } else {
                // Handle add
                const added = await mockApi.addDonation(donationData);

                // Add to local state
                setDonations([...donations, added]);

                notification.success({
                    message: "Success",
                    description: "Donation added successfully."
                });

                // Refresh stats after adding a donation
                const statsData = await mockApi.getDonationStats();
                setStats(statsData);
            }

            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentDonation(null);
        } catch (error) {
            notification.error({
                message: "Error",
                description: isEditMode
                    ? "Failed to update donation. Please try again."
                    : "Failed to add donation. Please try again."
            });
            console.error("Error processing donation:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddNew = () => {
        setIsEditMode(false);
        setCurrentDonation(null);
        setIsModalOpen(true);

        // Reset form if opening for a new donation
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.resetFields();
                // Set default date to today
                formRef.current.setFieldsValue({
                    date: new Date().toISOString().split('T')[0]
                });
            }
        }, 100);
    };

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="w-full min-h-screen">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-4 md:p-8 mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-xl font-bold mb-4 md:mb-0">Donations Management</h1>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                            <button
                                onClick={handleAddNew}
                                className="bg-sky-700 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-sky-800 transition-colors"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add Donation
                            </button>
                        </div>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-gray-500 text-sm font-medium">Total Donations</h3>
                                <p className="text-2xl font-bold">₵{stats.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-gray-500 text-sm font-medium">Donation Count</h3>
                                <p className="text-2xl font-bold">{stats.donationCount}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-gray-500 text-sm font-medium">Donation Methods</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {stats.methodTotals && Object.keys(stats.methodTotals).map(method => (
                                        <span key={method} className="bg-blue-100 text-sky-700 text-xs px-2 py-1 rounded-full">
                                            {method}: ₵{stats.methodTotals![method].toLocaleString()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <div className="p-4 border-b border-gray-200 ">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1 relative">
                                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by donor name, reference, purpose..."
                                        className="pl-10 pr-4 py-2 border rounded-md w-full"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setFilterVisible(!filterVisible)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                                        Filters
                                    </button>

                                    {filterVisible && (
                                        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 z-10 w-80">
                                            <h3 className="font-medium mb-2">Filter Donations</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        value={filters.donorName}
                                                        onChange={(e) => setFilters({ ...filters, donorName: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                                                        <input
                                                            type="number"
                                                            className="w-full px-3 py-2 border rounded-md"
                                                            value={filters.minAmount}
                                                            onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                                                        <input
                                                            type="number"
                                                            className="w-full px-3 py-2 border rounded-md"
                                                            value={filters.maxAmount}
                                                            onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                                        <input
                                                            type="date"
                                                            className="w-full px-3 py-2 border rounded-md"
                                                            value={filters.startDate}
                                                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                                        <input
                                                            type="date"
                                                            className="w-full px-3 py-2 border rounded-md"
                                                            value={filters.endDate}
                                                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                                                    <select
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        value={filters.method}
                                                        onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                                                    >
                                                        <option value="">All Methods</option>
                                                        {uniqueMethods.map(method => (
                                                            <option key={method} value={method}>{method}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                                                    <select
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        value={filters.purpose}
                                                        onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                                                    >
                                                        <option value="">All Purposes</option>
                                                        {uniquePurposes.map(purpose => (
                                                            <option key={purpose} value={purpose}>{purpose}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <button
                                                        onClick={resetFilters}
                                                        className="text-gray-600 hover:text-gray-800"
                                                    >
                                                        Reset Filters
                                                    </button>
                                                    <button
                                                        onClick={() => setFilterVisible(false)}
                                                        className="bg-sky-700 text-white px-4 py-1 rounded-md hover:bg-sky-800"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Table
                            title="Donations"
                            columns={columns}
                            data={filteredDonations}
                            loading={loading}
                        />
                    </div>

                    <Modal
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        title={isEditMode ? "Edit Donation" : "Add New Donation"}
                    >
                        <Form
                            ref={formRef}
                            onFinish={handleAddOrEdit}
                            layout="vertical"
                            initialValues={currentDonation || {}}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Form.Item
                                    label="Donor Name"
                                    name="donorName"
                                    rules={[{ required: true, message: "Donor name is required" }]}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter donor name"
                                        className="border rounded-sm p-2 w-full"
                                        list="members-list"
                                    />
                                    <datalist id="members-list">
                                        {members.map(member => (
                                            <option key={member.key} value={`${member.firstName} ${member.lastName}`} />
                                        ))}
                                    </datalist>
                                </Form.Item>

                                <Form.Item
                                    label="Amount"
                                    name="amount"
                                    rules={[
                                        { required: true, message: "Amount is required" },
                                        { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" }
                                    ]}
                                >
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₵</span>
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="border rounded-sm p-2 pl-6 w-full"
                                        />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[{ required: true, message: "Date is required" }]}
                                >
                                    <input type="date" className="border rounded-sm p-2 w-full" />
                                </Form.Item>

                                <Form.Item
                                    label="Method"
                                    name="method"
                                    rules={[{ required: true, message: "Payment method is required" }]}
                                >
                                    <select className="border rounded-sm p-2 w-full">
                                        <option value="">Select Method...</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Mobile Money">Mobile Money</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select>
                                </Form.Item>

                                <Form.Item
                                    label="Purpose"
                                    name="purpose"
                                    rules={[{ required: true, message: "Purpose is required" }]}
                                >
                                    <select className="border rounded-sm p-2 w-full">
                                        <option value="">Select...</option>
                                        <option value="Tithe">Tithe</option>
                                        <option value="Offering">Offering</option>
                                        <option value="Building Fund">Building Fund</option>
                                        <option value="Contribution">Contribution</option>
                                    </select>
                                </Form.Item>

                                <Form.Item
                                    label="Reference"
                                    name="reference"
                                    rules={[{ required: isEditMode, message: "Reference is required" }]}
                                >
                                    <input
                                        type="text"
                                        placeholder="DONxxxxx"
                                        className="border rounded-sm p-2 w-full"
                                        disabled={!isEditMode}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Member ID (Optional)"
                                    name="memberId"
                                >
                                    <select className="border rounded-sm p-2 w-full">
                                        <option value="">Select Member (Optional)</option>
                                        {members.map(member => (
                                            <option key={member.key} value={member.key}>
                                                {member.firstName} {member.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Item>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition-colors flex items-center"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                            {isEditMode ? "Updating..." : "Adding..."}
                                        </>
                                    ) : (
                                        isEditMode ? "Update Donation" : "Add Donation"
                                    )}
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Donations;