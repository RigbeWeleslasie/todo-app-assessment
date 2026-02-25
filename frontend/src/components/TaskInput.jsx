import { useState } from 'react';
import { saveTask } from '../api/axios';

export default function TaskInput({ onAdd }) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const priorityColors = {
        low:    'text-blue-600 bg-blue-50 border-blue-200',
        medium: 'text-amber-600 bg-amber-50 border-amber-200',
        high:   'text-green-600 bg-green-50 border-green-200',
    };

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

    return (
        <div className="px-4 md:px-9 py-4 md:py-5 border-b border-gray-100">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all overflow-hidden">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="What needs to be done today?"
                    className="w-full bg-transparent px-4 pt-4 pb-2 text-sm md:text-base text-gray-900 placeholder-gray-300 outline-none"
                />

                <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                                min={today}
                                className="bg-transparent text-xs text-gray-500 outline-none cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value)}
                                className={`text-xs font-semibold outline-none cursor-pointer border rounded-lg px-2 py-1 transition-all ${priorityColors[priority]}`}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 text-sm whitespace-nowrap disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : (
                            <>
                                <span className="hidden sm:inline">+ Add Task</span>
                                <span className="sm:hidden">+</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {error && <p className="text-red-400 text-sm mt-2 pl-1">{error}</p>}
        </div>
    );
}