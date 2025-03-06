import Breadcrumbs from "../components/Breadcrumbs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


const Dashboard = () => {
    function toggleSidebar(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-64 w-full">
            <Topbar toggleSidebar={toggleSidebar} />
            <Breadcrumbs />
                <div className="p-8 mt-24">
                    <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                    <p className="text-gray-500">Manage church activities here.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
