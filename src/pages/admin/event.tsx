import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Table from "../../components/Table.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const Events= () => {

    return (
        <div className="flex">
            <Sidebar />
            <div className="lg:ml-64 w-full h-screen">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                } } />
                <Breadcrumbs />
                <div className="p-8 mt-24" >
                    <div className="flex items-center justify-between w-full p-4">
                        <h1 className="font-semibold text-xl">Welcome to event sections </h1>
                        <button className="bg-sky-700 text-white p-2 rounded-lg"><FontAwesomeIcon icon={faPlus} /> Add Event</button>
                    </div>
                    <div>
                        <Table />
                    </div>
                </div>


            </div>

        </div>
    );
}
export default Events;