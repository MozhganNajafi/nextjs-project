'use client';
import React, { createContext, useState, useEffect } from "react";
import { useAppContext } from '@/context/context';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { state } = useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Effect to update isAuthenticated based on state changes
    useEffect(() => {
        const hasAccess = !!(state?.username && state?.jobTitle);
        if (hasAccess) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false);
        }
    }, [state]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };