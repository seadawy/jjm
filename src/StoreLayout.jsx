import { NavLink } from 'react-router-dom';
import NavLinksComponent from './shared/NavbarComponent';

const StoreLayout = ({ children }) => {
    const LinkStyle = "flex items-center gap-x-3 px-5 py-3 rounded hover:shadow-md hover:bg-[#77d030] dark:hover:bg-[#366330]";
    return (
        <>
            <NavLinksComponent >
                <NavLink className={LinkStyle} exact to="/" end="true">
                    <i className='pi pi-home'></i>
                    Home
                </NavLink>
                <NavLink className={LinkStyle} to="/Store">
                    <i className='pi pi-shop'></i>
                    Store
                </NavLink>
                <NavLink className={LinkStyle} to="/Partner">
                    <i className='pi pi-bullseye'></i>
                    Partners
                </NavLink>
            </NavLinksComponent>
            <main className='dark:bg-slate-800 mt-28'>
                {children}
            </main>
        </>
    );
};

export default StoreLayout;
