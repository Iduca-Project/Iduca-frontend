"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../constants/api';
import Cookies from 'js-cookie';


interface AuthContextData {
    signed: boolean;
    token: string | null;
    loading: boolean;
    signIn(credentials: any): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storagedToken = localStorage.getItem('@Iduca:token');
        if (storagedToken) {
            setToken(storagedToken);
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
        setLoading(false);
    }, []);

    async function signIn(credentials: any) {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token: newToken, firstAccess } = response.data;

            api.defaults.headers.Authorization = `Bearer ${newToken}`;
            localStorage.setItem('@Iduca:token', newToken);
            Cookies.set('auth_token', newToken, {
                expires: 1/3,
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            });
            
            setToken(newToken);

        } catch (error) {
            console.error("Falha no login", error);
            throw error;
        }
    }

    function signOut() {
        setToken(null);
        localStorage.removeItem('@Iduca:token');
        Cookies.remove('auth_token');
    }

    return (
        <AuthContext.Provider value={{ signed: !!token, token, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}