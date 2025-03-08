import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";

// Define types
interface Diocese {
    id: string;
    name: string;
}

interface Member {
    id: string;
    name: string;
    gender: string;
    employment_status: string;
    marital_status: string;
}

const Diocese = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [dioceses] = useState<Diocese[]>([]);
    const [selectedDiocese, setSelectedDiocese] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    // Fetch all dioceses
    useEffect(() => {
        let url = "http://localhost:5001/api/members";
    
        if (selectedDiocese) {
            url += `?diocese=${selectedDiocese}`;
        }
    
        axios.get<Member[]>(url)
            .then(response => setMembers(response.data))
            .catch(error => console.error("Error fetching members:", error));
    }, [selectedDiocese]);

    useEffect(() => {
        axios.get<Diocese[]>("http://localhost:5001/api/dioceses")
            .then(response => dioceses(response.data))
            .catch(error => console.error("Error fetching dioceses:", error));
    }, []);
    

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full min-h-screen p-6">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-8 mt-24">
                    {/* Filters */}
                    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-wrap gap-4 mt-4">
                        <select
                            className="border p-2 rounded w-full md:w-1/6"
                            value={selectedDiocese}
                            onChange={(e) => setSelectedDiocese(e.target.value)}
                        >
                            <option value="">All Dioceses</option>
                            {dioceses.map((diocese) => (
                                <option key={diocese.id} value={diocese.id}>
                                    {diocese.name}
                                </option>
                            ))}
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
                                    <th className="p-3 border-r">Name</th>
                                    <th className="p-3 border-r">Gender</th>
                                    <th className="p-3 border-r">Employment Status</th>
                                    <th className="p-3 border-r">Marital Status</th>
                                    <th className="p-3 border-r">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length > 0 ? (
                                    members
                                        .filter(member =>
                                            member.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((member) => (
                                            <tr key={member.id} className="hover:bg-gray-50">
                                                <td className="p-3">{member.name}</td>
                                                <td className="p-3">{member.gender}</td>
                                                <td className="p-3">{member.employment_status}</td>
                                                <td className="p-3">{member.marital_status}</td>
                                                <td className="p-3 flex gap-2">
                                                    <button className="bg-sky-700 text-white px-3 py-1 rounded">
                                                        Edit
                                                    </button>
                                                    <button className="bg-red-700 text-white px-3 py-1 rounded">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center p-4">
                                            No members found.
                                        </td>
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

export default Diocese;
function setDioceseMembers(_data: Member[]): any {
    throw new Error("Function not implemented.");
}

