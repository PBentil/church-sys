import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";

type Member = {
    id: number;
    name: string;
    gender: string;
    employment_status: string;
    marital_status: string;
};

const Members = () => {

    // Mock member data for frontend display
    const members: Member[] = [
        { id: 1, name: "John Doe", gender: "Male", employment_status: "Employed", marital_status: "Married" },
        { id: 2, name: "Jane Smith", gender: "Female", employment_status: "Unemployed", marital_status: "Single" },
        { id: 3, name: "Mark Johnson", gender: "Male", employment_status: "Employed", marital_status: "Divorced" },
        { id: 4, name: "Emily Davis", gender: "Female", employment_status: "Self-employed", marital_status: "Married" },
        // Add more mock data as needed
    ];

    // Static filter values (you can replace this with dynamic filtering if needed)
    const filteredMembers = members;

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full min-h-screen p-6">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-8 mt-24">
                    {/* Filters */}
                    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-wrap gap-4 mt-4">
                        <select className="border p-2 rounded w-full md:w-1/6">
                            <option value="">Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <select className="border p-2 rounded w-full md:w-1/6">
                            <option value="">Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>

                        <input type="text" placeholder="Search by name" className="border p-2 rounded w-full md:w-96 md:px-4" />
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
                                    <tr key={member.id} className="hover:bg-gray-50 p-2">
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
