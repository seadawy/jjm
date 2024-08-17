import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
    const [loading, setLoading] = useState(true);
    const [tokenState, setTokenState] = useState(false);
    const [adminState, setAdminState] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('https://api.jjmmods.store/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.error === "you dog get out") {
                    setAdminState(false);
                    setTokenState(false);
                    localStorage.removeItem('admin');
                    localStorage.removeItem('token');
                } else {
                    setAdminState(true);
                    setTokenState(true);
                    localStorage.setItem('token', token);
                    localStorage.setItem('admin', JSON.stringify(admin));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setAdmin(null);
                setToken(null);
                setAdminState(false)
                setTokenState(false)
                localStorage.removeItem('admin');
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        if (token) {
            fetchUser();
        }
        console.log(adminState, tokenState);
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, tokenState, admin, setAdmin, adminState }}>
            {children}
        </AppContext.Provider>
    );
}
