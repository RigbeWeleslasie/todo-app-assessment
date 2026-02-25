import { useState } from 'react';
import useTasks from '../hooks/useTasks';
import filterTasks from '../utils/filterTasks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

export default function Home() {
    const [filter, setFilter] = useState('all');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        tasks,
        loading,
        error,
        setError,
        addTask,
        completeTask,
        updateTask,
        deleteTask,
    } = useTasks();

    const filtered = filterTasks(tasks, filter);

    return (
        <div className="w-full max-w-8xl h-full flex rounded-3xl overflow-hidden shadow-xl border border-gray-200 relative">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className={`
                fixed md:static inset-y-0 left-0 z-30
                transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:flex
            `}>
                <Sidebar
                    tasks={tasks}
                    filter={filter}
                    setFilter={(f) => { setFilter(f); setSidebarOpen(false); }}
                />
            </div>
            <div className="flex-1 bg-white flex flex-col overflow-hidden">
                <div className="flex items-center md:hidden px-4 pt-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 mr-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Header filter={filter} />
                </div>

                <div className="hidden md:block">
                    <Header filter={filter} />
                </div>

                {error && (
                    <div className="mx-4 md:mx-9 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="ml-4 text-red-400 hover:text-red-600">x</button>
                    </div>
                )}

                <TaskInput onAdd={addTask} />

                <div className="flex-1 overflow-y-auto px-4 md:px-9 pb-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-4">
                            <div className="w-9 h-9 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                            <p className="text-gray-400 text-base">Loading your tasks...</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={filtered}
                            onComplete={completeTask}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}