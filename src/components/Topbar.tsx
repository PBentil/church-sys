import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faPlus, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        employment_status: "",
        marital_status: "",
        contact: "",
        circuit: "",
        diocese: "",
    });
    const [loading, setLoading] = useState(false);

    const formatPageTitle = (pathname: string) => {
        const paths = pathname.split("/").filter((x) => x);
        return paths.length ? paths[paths.length - 1].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Dashboard";
    };

    const handleSelect = (type: string) => {
        setDropdownOpen(false);
        setModalType(type);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

 // Import axios at the top if you prefer axios


 const handleSubmit = async () => {
    try {
        const response = await fetch("http://localhost:5001/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Read backend error message
            throw new Error(errorMessage);
        }

        const data = await response.json();
        alert("Member added successfully!");
        console.log("Server Response:", data);

        // Close modal and reset form
        setModalType(null);
        setFormData({
            name: "",
            gender: "",
            employment_status: "",
            marital_status: "",
            contact: "",
            circuit: "",
            diocese: "",
        });

    } catch (error) {
        console.error("Error saving member:", error);
        alert(`Failed to add member: ${error.message}`);
    }
};



    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 w-full md:w-[calc(100%-256px)] md:ml-64 transition-all z-40">
            <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <h1 className="text-lg md:text-xl font-semibold text-sky-700 mx-auto md:mx-0 capitalize">
                {formatPageTitle(location.pathname)}
            </h1>

            <div className="flex space-x-6">
                <button className="bg-sky-700 text-white rounded-lg px-4 py-2 flex items-center" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FontAwesomeIcon icon={faPlus} className="mr-1" /> New
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleSelect("Diocese")}>
                            Add Diocese
                        </button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleSelect("Members")}>
                            Add Members
                        </button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleSelect("Circuits")}>
                            Add Circuits
                        </button>
                    </div>
                )}

                <div className="flex items-center space-x-6">
                    <FontAwesomeIcon icon={faBell} className="text-gray-500 text-lg cursor-pointer" />
                    <FontAwesomeIcon icon={faUser} className="text-gray-500 text-lg cursor-pointer" />
                </div>
            </div>

            {modalType === "Members" && (
                <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add New Member</h2>
                            <button onClick={() => setModalType(null)}>
                                <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-lg" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded w-full" value={formData.name} onChange={handleChange} />

                            <select name="gender" className="border p-2 rounded w-full" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <input type="text" name="employment_status" placeholder="Employment Status" className="border p-2 rounded w-full" value={formData.employment_status} onChange={handleChange} />

                            <select name="marital_status" className="border p-2 rounded w-full" value={formData.marital_status} onChange={handleChange}>
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>

                            <input type="text" name="contact" placeholder="Contact Number" className="border p-2 rounded w-full" value={formData.contact} onChange={handleChange} />

                            <input type="text" name="circuit" placeholder="Circuit" className="border p-2 rounded w-full" value={formData.circuit} onChange={handleChange} />

                            <input type="text" name="diocese" placeholder="Diocese" className="border p-2 rounded w-full" value={formData.diocese} onChange={handleChange} />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setModalType(null)}>
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-sky-700 text-white rounded" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Topbar;
