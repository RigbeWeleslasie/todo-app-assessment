import { useState } from 'react';
import CalendarView from './CalendarView';

export default function Sidebar({ tasks, filter, setFilter }) {
    const [tab, setTab] = useState('tasks'); 

    const completed = tasks.filter(t => t.completed).length;
    const progress  = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    const stats = [
        { label: 'Total',    value: tasks.length              },
        { label: 'Done',     value: completed                 },
        { label: 'Left',     value: tasks.length - completed  },
        { label: 'Progress', value: `${progress}%`            },
    ];

    const filters = [
        { key: 'all',       count: tasks.length              },
        { key: 'pending',   count: tasks.length - completed  },
        { key: 'completed', count: completed                 },
    ];

    return (
        <div className="w-72 min-w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="p-8 pb-4">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Task Tracker</h1>
                    <p className="text-gray-400 text-sm mt-1">My productivity companion</p>
                </div>
                <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
                    <button
                        onClick={() => setTab('tasks')}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                            tab === 'tasks'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Tasks
                    </button>
                    <button
                        onClick={() => setTab('calendar')}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                            tab === 'calendar'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Calendar
                    </button>
                </div>
            </div>
            {tab === 'tasks' && (
                <div className="flex flex-col gap-6 px-8 pb-8 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map(s => (
                            <div key={s.label} className="rounded-2xl p-4 text-center border bg-gray-50 border-gray-200">
                                <span className="block text-3xl font-bold text-gray-900">{s.value}</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider mt-1 block">{s.label}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Daily Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Filter Tasks</p>
                        {filters.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium mb-2 transition-all border ${
                                    filter === f.key
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-current" />
                                <span className="capitalize">{f.key}</span>
                                <span className="ml-auto bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full text-sm">
                                    {f.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto text-center text-sm text-gray-300">
                        Built with React + Laravel
                    </div>
                </div>
            )}
            {tab === 'calendar' && (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <CalendarView tasks={tasks} />
                </div>
            )}
        </div>
    );
}