import TaskItem from './TaskItem';

export default function TaskList({ tasks, onComplete, onDelete, onUpdate }) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
                <p className="text-gray-500 font-semibold text-lg">No tasks here</p>
                <p className="text-gray-300 text-base">Add a task above to get started</p>
            </div>
        );
    }

    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}