import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";
import Selector from  "../components/DioceseSelector"
import axios from "axios";
import DioceseSelector from "../components/DioceseSelector";

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
    const [dioceses, setDioceses] = useState<Diocese[]>([]);
    const [selectedDiocese, setSelectedDiocese] = useState<string>("");
    const [view, setView] = useState("analytics"); // Default view
    
    useEffect(() => {
        axios.get<Diocese[]>("http://localhost:5001/api/dioceses")
            .then(response => setDioceses(response.data))
            .catch(error => console.error("Error fetching dioceses:", error));
    }, []);

    function setCurrentView(view: "analytics" | "members" | "circuits"): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full min-h-screen p-6">
                <Topbar toggleSidebar={() => { }} />
                <Breadcrumbs />

                <div className="p-8 mt-24">
                    {/* Diocese Selector */}
                    {/* <div className="bg-white shadow-md rounded p-4 mb-4">
                        <select
                            className="border p-2 rounded w-full md:w-1/3"
                            value={selectedDiocese}
                            onChange={(e) => setSelectedDiocese(e.target.value)}
                        >
                            <option value="">Select Diocese</option>
                            {dioceses.map((diocese) => (
                                <option key={diocese.id} value={diocese.id}>
                                    {diocese.name}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    {/* Navigation Buttons */}
                    {/* <div className="flex gap-4 mb-6">
                        <button 
                            className={`px-4 py-2 rounded ${view === "analytics" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            onClick={() => setView("analytics")}
                        >
                            Analytics
                        </button>
                        <button 
                            className={`px-4 py-2 rounded ${view === "circuits" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            onClick={() => setView("circuits")}
                        >
                            Circuits
                        </button>
                        <button 
                            className={`px-4 py-2 rounded ${view === "members" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            onClick={() => setView("members")}
                        >
                            Members
                        </button>
                    </div> */}
                    <div>
                        <DioceseSelector onViewChange={setCurrentView} />
                    </div>

                    {/* Content Display */}
                    <div className="bg-white shadow-md rounded p-6">
                        {view === "analytics" && <Analytics dioceseId={selectedDiocese} />}
                        {view === "circuits" && <Circuits dioceseId={selectedDiocese} />}
                        {view === "members" && <Members dioceseId={selectedDiocese} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Analytics = ({ dioceseId }: { dioceseId: string }) => (
    <div>
        <h2 className="text-lg font-semibold">Analytics for {dioceseId || "Selected Diocese"}</h2>
        {/* Add analytics content here */}
    </div>
);

const Circuits = ({ dioceseId }: { dioceseId: string }) => (
    <div>
        <h2 className="text-lg font-semibold">Circuits for {dioceseId || "Selected Diocese"}</h2>
        {/* Add circuits content here */}
    </div>
);

const Members = ({ dioceseId }: { dioceseId: string }) => {
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(() => {
        if (!dioceseId) return;
        axios.get<Member[]>(`http://localhost:5001/api/members?diocese=${dioceseId}`)
            .then(response => setMembers(response.data))
            .catch(error => console.error("Error fetching members:", error));
    }, [dioceseId]);

    return (
        <div>
            <h2 className="text-lg font-semibold">Members in {dioceseId || "Selected Diocese"}</h2>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.name} - {member.gender}</li>
                ))}
            </ul>
        </div>
    );
};

export default Diocese;
