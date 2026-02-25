import { useState } from 'react';
import api from '../api/axios';
import handleError from '../utils/handleError';
import DeleteConfirmModal from './DeleteConfirmModal';

const PRIORITY_STYLES = {
    high:   { bar: 'bg-green-500',   badge: 'bg-green-100 text-green-600', label: 'High' },
    medium: { bar: 'bg-amber-400',   badge: 'bg-amber-100 text-amber-600', label: 'Medium' },
    low:    { bar: 'bg-blue-400',    badge: 'bg-blue-100 text-blue-600',   label: 'Low' },
};

function formatDueDate(dateStr) {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('T')[0].split('-');
    const date = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = Math.floor((date - today) / (1000 * 60 * 60 * 24));

    if (diff < 0)   return { label: 'Overdue',      color: 'text-red-500' };
    if (diff === 0) return { label: 'Due today',    color: 'text-orange-500' };
    if (diff === 1) return { label: 'Due tomorrow', color: 'text-yellow-500' };

    return {
        label: `Due ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        color: 'text-gray-400'
    };
}

export default function TaskItem({ task, onComplete, onDelete, onUpdate }) {
    const [expanded,      setExpanded]      = useState(false);
    const [description,   setDescription]   = useState(task.description || '');
    const [saving,        setSaving]        = useState(false);
    const [error,         setError]         = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const isCompleted = task.completed === 1 || task.completed === true;
    const priority    = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;
    const dueDate     = formatDueDate(task.due_date);

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

    return (
        <div className={`rounded-2xl border mb-3 transition-all duration-200 overflow-hidden ${
            isCompleted
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}>
            <div className="flex items-stretch">
                <div className={`w-1.5 flex-shrink-0 ${isCompleted ? 'bg-emerald-400' : priority.bar}`} />

                <div className="flex items-center justify-between px-5 py-4 flex-1">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => onComplete(task)}
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isCompleted
                                    ? 'bg-emerald-500 border-emerald-500 shadow-sm'
                                    : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'
                            }`}
                        >
                            {isCompleted && (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className={`text-base font-semibold transition-all ${isCompleted ? 'text-gray-300 line-through' : 'text-gray-800'}`}>
                                    {task.title}
                                </p>
                                {!isCompleted && (
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priority.badge}`}>
                                        {priority.label}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                {dueDate && !isCompleted && (
                                    <span className={`text-xs font-medium ${dueDate.color}`}>{dueDate.label}</span>
                                )}
                                {task.description && !expanded && (
                                    <span className="text-xs text-gray-400 truncate">{task.description}</span>
                                )}
                                {!task.description && !expanded && (
                                    <span className="text-xs text-gray-300 italic">No note yet</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all"
                        >
                            {expanded ? 'Close' : task.description ? 'Edit Note' : 'Add Note'}
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {expanded && (
                <div className="px-5 pb-4 border-t border-gray-100 pt-3 ml-1.5">
                    {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Add a note or description..."
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 placeholder-gray-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={() => setExpanded(false)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveDescription}
                            disabled={saving}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Note'}
                        </button>
                    </div>
                </div>
            )}
            {confirmDelete && (
                <DeleteConfirmModal
                    taskTitle={task.title}
                    onConfirm={() => { onDelete(task.id); setConfirmDelete(false); }}
                    onCancel={() => setConfirmDelete(false)}
                />
            )}
        </div>
    );
}
