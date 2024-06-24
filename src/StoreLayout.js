import { useState } from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import NavLinksComponent from './store/component/NavLinksComponent';

const StoreLayout = ({ children }) => {
    const [menuState, setMenuState] = useState(false);

    const menuOpen = () => {
        setMenuState(!menuState);
    };

    return (
        <>
            <ScrollTop className='bg-[#855ba8] p-3 rounded-md text-white' />
            <nav className="flex flex-col md:flex-row justify-between items-center p-2 shadow-lg" id="StoreNavBar">
                <div className='flex justify-between sm:justify-center md:justify-between items-center w-full'>
                    <div className="md:ms-12 p-2">
                        <img src="/jjmlogo.png" width="100" alt="logo" />
                    </div>
                    <div className='block sm:hidden'>
                        <button className='p-2 text-2xl' onClick={menuOpen}>
                            {menuState ?
                                <i className='pi pi-times text-white'></i>
                                : <i className='pi pi-bars text-white'></i>
                            }
                        </button>
                    </div>
                </div>
                <div className={`${menuState ? 'block' : 'hidden'} sm:flex flex-col sm:flex-row items-center gap-x-5 gap-y-6 w-full sm:w-auto text-white text-xl`}>
                    <NavLinksComponent />
                </div>
            </nav>
            <main className='dark:bg-slate-800'>
                {children}
            </main>
        </>
    );
};

export default StoreLayout;
