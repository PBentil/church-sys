import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";


type Member = {
    id: number;
    name: string;
    gender: string;
    employment_status: string;
    marital_status: string;
};

const Members = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [gender, setGender] = useState("");
    const [employmentStatus] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get<Member[]>("http://localhost:5001/api/members")
            .then(response => setMembers(response.data))
            .catch(error => console.error("Error fetching members:", error));
    }, []);

    const filteredMembers = members
        .filter((member) =>
            search ? member.name.toLowerCase().includes(search.toLowerCase()) : true
        )
        .filter((member) =>
            gender ? member.gender === gender : true
        )
        .filter((member) =>
            employmentStatus ? member.employment_status === employmentStatus : true
        )
        .filter((member) =>
            maritalStatus ? member.marital_status === maritalStatus : true
        );

    return (
        <div className="flex">
             <Sidebar />
            <div className="lg:ml-64 w-full min-h-screen p-6">
            <Topbar toggleSidebar={() => { }} />
            <Breadcrumbs />
           
                <div className="p-8 mt-24">
                    
                    {/* Filters */}
                    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-wrap gap-4 mt-4">
                        <select className="border p-2 rounded w-full md:w-1/6" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <select className="border p-2 rounded w-full md:w-1/6" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                            <option value="">Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>

                        <input type="text" placeholder="Search by name" className="border p-2 rounded w-full md:w-96 md:px-4" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    {/* Members Table */}
                    <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-sky-700">
                                    <th className="p-3 border-r">Name</th>
                                    <th className="p-3 border-r">Gender</th>
                                    <th className="p-3 border-r">Employment Status</th>
                                    <th className="p-3 border-r">Marital Status</th>
                                    <th className="p-3 border-r">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <tr key={member.id || member.name} className="hover:bg-gray-50 p-2">
                                            <td className="p-3">{member.name}</td>
                                            <td className="p-3">{member.gender}</td>
                                            <td className="p-3">{member.employment_status}</td>
                                            <td className="p-3">{member.marital_status}</td>
                                            <td className="p-3 flex gap-2">
                                                <button className="bg-sky-700 text-white px-3 py-1 rounded">Edit</button>
                                                <button className="bg-red-700 text-white px-3 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center p-4">No members found.</td>
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
