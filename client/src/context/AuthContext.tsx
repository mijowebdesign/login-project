import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import { setAccessToken } from '../services/baseApi';

interface AuthContextType {
    user: authService.User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: authService.LoginRequest) => Promise<void>;
    register: (data: authService.RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<authService.User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const data = await authService.refresh();
            setUser(data.user);
        } catch (error) {
            // No valid session, stay logged out
            setUser(null);
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
        
        // Listener for interceptor-triggered logouts
        const handleLogout = () => {
            setUser(null);
        };
        window.addEventListener('auth-logout', handleLogout);
        return () => window.removeEventListener('auth-logout', handleLogout);
    }, [checkAuth]);

    const login = async (credentials: authService.LoginRequest) => {
        const data = await authService.login(credentials);
        setUser(data.user);
    };

    const register = async (data: authService.RegisterRequest) => {
        await authService.register(data);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
