'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type UserDetailModel = {
    username: string;
    jobTitle: string;
};

type ContextValue = {
    state: UserDetailModel;
    updateContext: (newValues: UserDetailModel) => void;
};

const userModel: UserDetailModel = {
    username: '',
    jobTitle: '',
};

const AppContext = createContext<ContextValue | undefined>(undefined);

export default function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [state, setState] = useState<UserDetailModel>(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('userModel');
            return savedState ? JSON.parse(savedState) : userModel;
        } else {
            return userModel;
        }
    });

    // Function to update context state with new values
    const updateContext = (newValues: UserDetailModel) => {
        setState((prevState) => {
            const nextState = {
                ...prevState,
                ...newValues,
            };
            localStorage.setItem('userModel', JSON.stringify(nextState)); // Save to localStorage
            return nextState;
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('userModel');
            if (savedState) {
                setState(JSON.parse(savedState));
            }
        }
    }, []);

    return (
        <AppContext.Provider value={{ state, updateContext }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
