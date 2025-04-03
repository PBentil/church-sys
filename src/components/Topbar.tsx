
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const location = useLocation();

    const formatPageTitle = (pathname: string) => {
        const paths = pathname.split("/").filter((x) => x);
        return paths.length ? paths[paths.length - 1].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Dashboard";
    };
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 w-full md:w-[calc(100%-256px)] md:ml-64 transition-all z-40">
            <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <h1 className="text-lg md:text-xl font-semibold text-sky-700 mx-auto md:mx-0 capitalize">
                {formatPageTitle(location.pathname)}
            </h1>
                <div className="flex items-center space-x-10 pr-7">
                    <FontAwesomeIcon icon={faBell} className="text-gray-500 text-lg cursor-pointer" />
                    <FontAwesomeIcon icon={faUser} className="text-gray-500 text-lg cursor-pointer" />
                </div>


        </div>
    );
};

export default Topbar;
