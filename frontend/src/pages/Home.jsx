import { useState } from 'react';
import useTasks from '../hooks/useTasks';
import filterTasks from '../utils/filterTasks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

export default function Home() {
    const [filter, setFilter] = useState('all');

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
        <div className="w-full max-w-8xl h-[88vh] flex rounded-3xl overflow-hidden shadow-xl border border-gray-200">

            <Sidebar tasks={tasks} filter={filter} setFilter={setFilter} />

            <div className="flex-1 bg-white flex flex-col overflow-hidden">

                <Header filter={filter} />

                {error && (
                    <div className="mx-9 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="ml-4 text-red-400 hover:text-red-600">x</button>
                    </div>
                )}

                <TaskInput onAdd={addTask} />

                <div className="flex-1 overflow-y-auto px-9 pb-6">
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