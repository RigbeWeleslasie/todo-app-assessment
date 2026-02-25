import formatDate from '../utils/dateFormatter';

const titles = {
    all:       'All Tasks',
    completed: 'Completed',
    pending:   'Pending',
};

export default function Header({ filter }) {
    return (
        <div className="px-4 md:px-9 pt-6 md:pt-9 pb-4 md:pb-5 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">{titles[filter]}</h2>
            <p className="text-gray-400 text-base mt-1">{formatDate()}</p>
        </div>
    );
}