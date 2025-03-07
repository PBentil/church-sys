import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";

const Members = () => {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");

    const fetchMembers = async () => {
        let url = `http://localhost:5001/api/members/1`;
        let params = [];
        if (search) params.push(`search=${search}`);
        if (gender) params.push(`gender=${gender}`);
        if (employmentStatus) params.push(`employment_status=${employmentStatus}`);
        if (maritalStatus) params.push(`marital_status=${maritalStatus}`);

        if (params.length > 0) {
            url += "?" + params.join("&");
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [search, gender, employmentStatus, maritalStatus]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full min-h-screen p-6">
                <Topbar toggleSidebar={function (): void {
                    throw new Error("Function not implemented.");
                }} />
                <Breadcrumbs />
                _<div className="p-8 mt-24">
                    {/* Filters */}
                    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-wrap gap-4 mt-4">
                     
                        <select
                            className="border p-2 rounded  w-full md:w-1/6"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <select
                            className="border p-2 rounded w-full md:w-1/6"
                            value={employmentStatus}
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                        >
                            <option value="">Employment Status</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                        </select>
                        <select
                            className="border p-2 rounded w-full md:w-1/6"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                        >
                            <option value="">Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="border p-2 rounded w-full md:w-xl md:p-x-4"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Members Table */}
                    <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-sky-700">
                                    <th className="p-3 border-r-">Name</th>
                                    <th className="p-3 border-r">Gender</th>
                                    <th className="p-3 border-r">Employment Status</th>
                                    <th className="p-3 border-r">Marital Status</th>
                                    <th className="p-3 border-r">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50">
                                            <td className="p-3 border">{member.name}</td>
                                            <td className="p-3 border">{member.gender}</td>
                                            <td className="p-3 border">{member.employment_status}</td>
                                            <td className="p-3 border">{member.marital_status}</td>
                                            <td className="p-3 border flex gap-2">
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4">No members found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
