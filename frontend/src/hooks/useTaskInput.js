import { useState } from 'react';
import { saveTask } from '../api/axios';

export default function useTaskInput(onAdd) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError('Please enter a task title!');
            return;
        }

        const newTask = {
            title: title.trim(),
            due_date: dueDate || null,
            priority,
            completed: false,
        };

        try {
            setLoading(true);
            const savedTask = await saveTask(newTask);
            onAdd(savedTask);
            setTitle('');
            setDueDate('');
            setPriority('medium');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        title, setTitle,
        dueDate, setDueDate,
        priority, setPriority,
        error,
        loading,
        today,
        handleSubmit,
    };
}