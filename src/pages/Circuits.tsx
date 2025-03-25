
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";
import TableList from "../components/Table";


const Circuits = () => {
    return (
        <>
            <Sidebar />
            <div className="lg:ml-56 w-full min-h-screen p-6 fixed">
                <Topbar toggleSidebar={function (): void {
                    throw new Error("Function not implemented.");
                }} />
                <Breadcrumbs />
                <div className="lg:mt-25 lg:w-5/6 lg:ml-13">
                    <TableList />
                </div>


            </div>
        </>
    )
}

export default Circuits;