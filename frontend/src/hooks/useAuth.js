import { useState } from 'react';
import api from '../api/axios';

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const register = async (data) => {
        try {
            setLoading(true);
            setError('');
            const res = await api.post('/register', data);
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_user', JSON.stringify(res.data.user));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        try {
            setLoading(true);
            setError('');
            const res = await api.post('/login', data);
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_user', JSON.stringify(res.data.user));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '/login';
        }
    };

    const getUser = () => {
        const user = localStorage.getItem('auth_user');
        return user ? JSON.parse(user) : null;
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('auth_token');
    };

    return { login, register, logout, getUser, isAuthenticated, loading, error, setError };
}