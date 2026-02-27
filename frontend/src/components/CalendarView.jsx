import { useState } from 'react';
import PRIORITY_STYLES from '../constants/priorities';

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({ tasks }) {
    const today = new Date();
    const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selected, setSelected] = useState(today.getDate());

    const daysInMonth = getDaysInMonth(current.year, current.month);
    const firstDay = getFirstDayOfMonth(current.year, current.month);

    const prevMonth = () => {
        setCurrent(c => {
            if (c.month === 0) return { year: c.year - 1, month: 11 };
            return { year: c.year, month: c.month - 1 };
        });
        setSelected(null);
    };

    const nextMonth = () => {
        setCurrent(c => {
            if (c.month === 11) return { year: c.year + 1, month: 0 };
            return { year: c.year, month: c.month + 1 };
        });
        setSelected(null);
    };
    const getTasksForDay = (day) => {
        if (!day) return [];

        return tasks.filter(task => {
            if (!task.due_date) return false;

            const taskDate = new Date(task.due_date);

            return (
                taskDate.getFullYear() === current.year &&
                taskDate.getMonth() === current.month &&
                taskDate.getDate() === day
            );
        });
    };
    const selectedTasks = selected ? getTasksForDay(selected) : [];
    const isToday = (day) =>
        day === today.getDate() &&
        current.month === today.getMonth() &&
        current.year === today.getFullYear();

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <button
                    onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-700"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h3 className="text-base font-bold text-gray-900">
                    {MONTHS[current.month]} {current.year}
                </h3>
                <button
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-700"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7 px-4 pt-3 pb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-300 uppercase tracking-wider py-1">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 px-4 gap-y-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayTasks = getTasksForDay(day);
                    const hasHigh = dayTasks.some(t => t.priority === 'high');
                    const hasMedium = dayTasks.some(t => t.priority === 'medium');
                    const hasLow = dayTasks.some(t => t.priority === 'low');
                    const isSelected = selected === day;

                    return (
                        <button
                            key={day}
                            onClick={() => setSelected(day)}
                            className={`relative flex flex-col items-center py-1.5 rounded-xl transition-all ${isSelected
                                ? 'bg-gray-900 text-white'
                                : isToday(day)
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            <span className={`text-sm font-semibold ${isSelected ? 'text-white' : ''}`}>
                                {day}
                            </span>
                            {dayTasks.length > 0 && (
                                <div className="flex gap-0.5 mt-0.5">
                                    {hasHigh && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-red-300' : 'bg-red-500'}`} />}
                                    {hasMedium && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-400'}`} />}
                                    {hasLow && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-300' : 'bg-blue-400'}`} />}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            <div className="mx-4 my-3 border-t border-gray-100" />
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                {selected && (
                    <>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                            {MONTHS[current.month]} {selected}
                        </p>

                        {selectedTasks.length > 0 && (
                            <p className="text-xs font-semibold text-gray-500 mb-2">Due</p>
                        )}

                        {selectedTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-2">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-300 text-sm">No tasks this day</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {selectedTasks.map(task => {
                                    const p = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;
                                    return (
                                        <div
                                            key={task.id}
                                            className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all ${task.completed ? 'opacity-50' : ''
                                                }`}
                                        >
                                            <div className={`w-1 h-10 rounded-full flex-shrink-0 ${p.bar}`} />

                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-semibold truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                                    {task.title}
                                                </p>
                                                {task.description && (
                                                    <p className="text-xs text-gray-400 truncate mt-0.5">{task.description}</p>
                                                )}
                                            </div>

                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${p.badge}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {!selected && (
                    <p className="text-center text-gray-300 text-sm py-8">
                        Select a day to see tasks
                    </p>
                )}
            </div>
        </div>
    );
}