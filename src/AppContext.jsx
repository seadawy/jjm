import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAdmin(data);
                localStorage.setItem('admin', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching user data:', error);
                setAdmin(null);
                localStorage.removeItem('admin');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, admin, setAdmin }}>
            {children}
        </AppContext.Provider>
    );
}
