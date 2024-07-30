import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const NavLinksCompoenet = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('theme');
        return savedMode ? savedMode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [menuState, setMenuState] = useState(false);

    const menuOpen = () => {
        setMenuState(!menuState);
    };
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);
    const LinkStyle = "flex items-center gap-x-3 px-5 py-3 rounded hover:shadow-md hover:bg-[#77d030] dark:hover:bg-[#366330]";
    return (
        <>
            <nav className="fixed w-full top-0 z-20 flex flex-col md:flex-row justify-between items-center p-2 shadow-lg" id="StoreNavBar">
                <div className='flex justify-between sm:justify-center md:justify-between items-center w-full'>
                    <div className="md:ms-12 p-2">
                        <Link to="/">
                            <img src="/jjmlogo.png" width="105" alt="logo" />
                        </Link>
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
                    {children}
                    <div className='md:me-10 flex gap-4 mx-4 my-2 sm:m-0'>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`${LinkStyle}`}
                        >
                            {darkMode ? '🌜' : '🌞'}
                        </button>
                        <a className={`${LinkStyle}`} href='https://discord.com/invite/7XkQjJY8pG' target='_blank' rel="noopener noreferrer">
                            <i className='pi pi-discord'></i>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavLinksCompoenet;