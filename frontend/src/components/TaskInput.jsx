import { useState } from 'react';

export default function TaskInput({ onAdd }) {
    const [title,       setTitle]       = useState('');
    const [description, setDescription] = useState('');
    const [dueDate,     setDueDate]     = useState('');
    const [priority,    setPriority]    = useState('medium');
    const [error,       setError]       = useState('');

    const handleSubmit = () => {
        if (!title.trim()) {
            setError('Please enter a task title!');
            return;
        }
        onAdd(title, description, dueDate || null, priority);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setError('');
    };

    const priorityConfig = {
        low:    { color: 'bg-blue-400',  text: 'text-blue-600',  ring: 'ring-blue-300'  },
        medium: { color: 'bg-amber-400', text: 'text-amber-600', ring: 'ring-amber-300' },
        high:   { color: 'bg-red-500',   text: 'text-red-600',   ring: 'ring-red-300'   },
    };

    return (
        <div className="px-9 py-5 border-b border-gray-100">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="What needs to be done today?"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-base text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 whitespace-nowrap text-base"
                >
                    + Add Task
                </button>
            </div>

            <div className="flex gap-3 mt-3 items-center">
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Add a note (optional)"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />

                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-500 outline-none focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="bg-transparent text-sm text-gray-600 outline-none"
                    />
                </div>

                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                    {['low', 'medium', 'high'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                                priority === p
                                    ? `${priorityConfig[p].color} text-white shadow-sm`
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-400 text-sm mt-2 pl-1">{error}</p>}
        </div>
    );
}
