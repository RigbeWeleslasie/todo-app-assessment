import { useState, useEffect } from 'react';
import api from '../api/axios';
import handleError from '../utils/handleError';

export default function useFetchTasks() {
    const [tasks,   setTasks]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState('');

    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data))
            .catch(err => handleError(err, setError, 'Failed to load tasks.'))
            .finally(() => setLoading(false));
    }, []);

    return { tasks, setTasks, loading, error, setError };
}
