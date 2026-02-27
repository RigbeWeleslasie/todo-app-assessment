import { useState } from 'react';
import api from '../api/axios';
import handleError from '../utils/handleError';

export default function useTaskDescription(task, onUpdate) {
    const [expanded,    setExpanded]    = useState(false);
    const [description, setDescription] = useState(task.description || '');
    const [saving,      setSaving]      = useState(false);
    const [error,       setError]       = useState('');

    const handleSaveDescription = () => {
        setSaving(true);
        api.put('/tasks/' + task.id, { description })
            .then(res => {
                onUpdate(res.data);
                setExpanded(false);
                setError('');
            })
            .catch(err => handleError(err, setError, 'Failed to save description.'))
            .finally(() => setSaving(false));
    };

    return {
        expanded, setExpanded,
        description, setDescription,
        saving, error,
        handleSaveDescription,
    };
}