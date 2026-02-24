import api from '../api/axios';
import handleError from '../utils/handleError';
import useFetchTasks from './useFetchTasks';

export default function useTasks() {
    const { tasks, setTasks, loading, error, setError } = useFetchTasks();

    const addTask = (title, description = '', due_date = null, priority = 'medium') => {
        api.post('/tasks', { title, description, due_date, priority, completed: false })
            .then(res => setTasks(prev => [...prev, res.data]))
            .catch(err => handleError(err, setError, 'Failed to add task.'));
    };

    const completeTask = (task) => {
        api.put('/tasks/' + task.id, { completed: !task.completed })
            .then(res => setTasks(prev => prev.map(t => t.id === task.id ? res.data : t)))
            .catch(err => handleError(err, setError, 'Failed to update task.'));
    };

    const updateTask = (updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    const deleteTask = (id) => {
        api.delete('/tasks/' + id)
            .then(() => setTasks(prev => prev.filter(t => t.id !== id)))
            .catch(err => handleError(err, setError, 'Failed to delete task.'));
    };

    return { tasks, loading, error, setError, addTask, completeTask, updateTask, deleteTask };
}
