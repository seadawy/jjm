import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const NavLinksCompoenet = () => {
    const LinkStyle = "flex items-center gap-x-3 px-5 py-3 rounded hover:shadow-md hover:bg-[#77d030]";
    return (
        <>
            <NavLink className={LinkStyle} to="/Home" end>
                <i className='pi pi-home'></i>
                Home
            </NavLink>
            <NavLink className={LinkStyle} to="/Store">
                <i className='pi pi-shop'></i>
                Store
            </NavLink>
            <NavLink className={LinkStyle} to="/Discord">
                <i className='pi pi-discord'></i>
                Discord
            </NavLink>
            <NavLink className={LinkStyle} to="/About">
                <i className='pi pi-bullseye'></i>
                Parteners
            </NavLink>
        </>
    );
}

export default NavLinksCompoenet;