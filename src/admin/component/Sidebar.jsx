import { NavLink } from "react-router-dom";
const Sidebar = () => {
    const linkStyle = `bg-green-200 mx-3 p-4 text-xl rounded flex gap-4 items-center shadow-md hover:bg-green-300 group`;
    const iconStyle = `text-violet-800 bg-[#2d2d2d29] p-2 rounded-full group-hover:bg-[#254c17a0] group-hover:text-white`;
    return (
        <>
            <div className="bg-gray-100 shadow-md dark:bg-slate-700 gap-3 h-screen flex flex-col pt-5">
                <NavLink to="/Admin/Dashboard" className={linkStyle}>
                    <i className={`pi pi-compass ${iconStyle}`} ></i>
                    Dashboard
                </NavLink>
                <NavLink to="/Admin/Car/View" className={linkStyle}>
                    <i className={`pi pi-car ${iconStyle}`}></i>
                    View Cars
                </NavLink>
                <NavLink to="/Admin/Car/Add" className={linkStyle}>
                    <i className={`pi pi-plus ${iconStyle}`}></i>
                    Add Cars
                </NavLink>
            </div >
        </>
    );
}

export default Sidebar;