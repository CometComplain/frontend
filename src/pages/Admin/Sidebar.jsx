import { useState } from "react";
import MainDashboard from "./MainDashboard";
import Addusers from "./AddUsers";
import Tables from "./Tables";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";
import dashboard from '@/assets/dashboard.svg';
import tables from '@/assets/tables.svg';
import statistics from '@/assets/statistics.svg';
import add from '@/assets/addUsers.svg';


const routes = [
    {
        title: "Dashboard",
        component: "MainDashboard",
        icon: dashboard
    },
    {
        title: "Add Users",
        component: "Addusers",
        icon: add
    },
    {
        title: "Tables",
        component: "Tables",
        icon: tables
    },
    {
        title: "Statistics",
        component: "Statistics",
        icon: statistics
    }
];


const SideBar = ({setComponent}) => {
    const [openSidenav, setOpenSidenav] = useState(true);
    return (
        <div className="flex">
        <aside
            className={`${openSidenav ? "w-64" : "w-16"} bg-gray-800 h-screen  z-10 shadow-lg transition-all duration-300 ease-in-out overflow-y-auto ${openSidenav ? "overflow-y-auto" : "overflow-hidden"}`}
            // style={{ top: '5vh' }}
            >
            <div className={`relative`}>
                <Link to="/" className="py-6 px-8 text-center">
                    <div className="flex items-center justify-center ">
                        Student conserns
                    </div>
                </Link>
            </div>
            <div className="m-4">
                {routes.map(({ title, component, icon }, index) => (
                    <ul onClick={() => setComponent(component)} key={index} className="mb-4 flex flex-col gap-1">
                        <img src={icon} />
                        {title && (
                            <li className="mx-3.5 mt-4 mb-2">
                                {title}
                            </li>
                        )}
                    </ul>
                ))}
            </div>
        </aside>
        <button onClick={() => setOpenSidenav(prev => !prev)}>click</button>
                </div>
    );
};

export default SideBar;
