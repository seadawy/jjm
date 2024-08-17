import NavLinksComponent from './shared/NavbarComponent';
import Sidebar from './admin/component/Sidebar'
import { NavLink } from 'react-router-dom';
const AdminLayout = ({ children }) => {
    const LinkStyle = "flex items-center gap-x-3 px-5 py-3 rounded hover:shadow-md hover:bg-[#77d030] dark:hover:bg-[#366330]";
    return (
        <>
            <NavLinksComponent></NavLinksComponent>
            <div className='flex mt-28'>
                <div className='w-3/12 h-full top-0 z-10 hidden sm:sticky sm:block'>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-full dark:bg-slate-800 p-5 m-2'>
                    {children}
                </div>
            </div>
        </>
    );
}

export default AdminLayout;