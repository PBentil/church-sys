import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";

interface Diocese {
    id: string;
    name: string;
}

interface DioceseStats {
    circuits: number;
    members: number;
}

interface DioceseSelectorProps {
    onViewChange: (view: "analytics" | "circuits" | "members") => void;
}

const DioceseSelector: React.FC<DioceseSelectorProps> = ({ onViewChange }) => {
    const [dioceses, setDioceses] = useState<Diocese[]>([]);
    const [selectedDiocese, setSelectedDiocese] = useState<string>("");
    const [stats, setStats] = useState<DioceseStats>({ circuits: 0, members: 0 });

    useEffect(() => {
        axios.get<Diocese[]>("http://localhost:5001/api/dioceses")
            .then(response => setDioceses(response.data))
            .catch(error => console.error("Error fetching dioceses:", error));
    }, []);

    useEffect(() => {
        if (selectedDiocese) {
            axios.get<DioceseStats>(`http://localhost:5001/api/dioceses/${selectedDiocese}/stats`)
                .then(response => setStats(response.data))
                .catch(error => console.error("Error fetching diocese stats:", error));
        }
    }, [selectedDiocese]);

    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            {/* Diocese Selection */}
            <select
                className="border p-2 rounded w-full md:w-1/3"
                value={selectedDiocese}
                onChange={(e) => setSelectedDiocese(e.target.value)}
            >
                <option value="">Select Diocese</option>
                {dioceses.map((diocese) => (
                    <option key={diocese.id} value={diocese.id}>{diocese.name}</option>
                ))}
            </select>

            {/* Stats */}
            <div className="flex space-x-7 mt-4 text-gray-700">
                <div> <FontAwesomeIcon icon={faGlobe} size="lg" />   <strong>{stats.circuits}</strong> Circuits </div>
                <div> <FontAwesomeIcon icon={faUsers} size="lg" />   <strong>{stats.members}</strong> Members</div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                <button onClick={() => onViewChange("analytics")} className="bg-blue-600 text-white px-4 py-2 rounded">Analytics</button>
                <button onClick={() => onViewChange("circuits")} className="bg-green-600 text-white px-4 py-2 rounded">Circuits</button>
                <button onClick={() => onViewChange("members")} className="bg-purple-600 text-white px-4 py-2 rounded">Members</button>
            </div>
        </div>
    );
};

export default DioceseSelector;
