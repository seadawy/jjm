import { useState } from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import NavLinksComponent from './shared/NavbarComponent';

const StoreLayout = ({ children }) => {
    const LinkStyle = "flex items-center gap-x-3 px-5 py-3 rounded hover:shadow-md hover:bg-[#77d030] dark:hover:bg-[#366330]";
    return (
        <>
            <ScrollTop className='bg-[#855ba8] p-3 rounded-md text-white' />
            <NavLinksComponent >
                <NavLink className={LinkStyle} exact to="/" end="true">
                    <i className='pi pi-home'></i>
                    Home
                </NavLink>
                <NavLink className={LinkStyle} to="/Store">
                    <i className='pi pi-shop'></i>
                    Store
                </NavLink>

                <NavLink className={LinkStyle} to="/About">
                    <i className='pi pi-bullseye'></i>
                    Partners
                </NavLink>
            </NavLinksComponent>
            <main className='dark:bg-slate-800'>
                {children}
            </main>
        </>
    );
};

export default StoreLayout;
