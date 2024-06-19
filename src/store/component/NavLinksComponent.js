import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const NavLinksCompoenet = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('theme');
        return savedMode ? savedMode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

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
            <NavLink className={LinkStyle} exact to="/" end>
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
            <div className='md:me-10 flex gap-4 mx-4 my-2 sm:m-0'>
                <a className={`${LinkStyle} border-2`} href='https://discord.com/invite/7XkQjJY8pG' target='_blank' rel="noopener noreferrer">
                    <i className='pi pi-discord'></i>
                </a>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`${LinkStyle} border-2`}
                >
                    {darkMode ? '🌜' : '🌞'}
                </button>
            </div>
        </>
    );
}

export default NavLinksCompoenet;