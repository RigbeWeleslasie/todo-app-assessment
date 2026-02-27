import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export default function useLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, setError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading, error, setError,
        handleSubmit,
    };
}