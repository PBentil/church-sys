import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({ icon, count, label }: { icon: any; count: number; label: string }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FontAwesomeIcon icon={icon} className="text-4xl text-sky-700" />
            <div>
                <h3 className="text-2xl font-bold">{count}</h3>
                <p className="text-gray-600">{label}</p>
            </div>
        </div>
    );
};

export default DashboardCard;
