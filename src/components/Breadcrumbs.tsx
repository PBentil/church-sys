import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="bg-sky-700 py-3 px-4 text-white text-sm fixed top-14 left-0 w-full md:w-[calc(100%-256px)] md:ml-64 z-30">
            <nav className="flex space-x-2">
                <Link to="/" className="hover:underline">Home</Link>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return (
                        <span key={name} className="flex items-center space-x-2">
                            <span>/</span>
                            <Link to={routeTo} className="hover:underline capitalize">{name}</Link>
                        </span>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
