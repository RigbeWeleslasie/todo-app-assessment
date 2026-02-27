import { useState } from 'react';
import formatDate from '../utils/dateFormatter';
import useAuth from '../hooks/useAuth';
import LogoutConfirmModal from './LogoutConfirmModal';

const titles = {
    all:       'All Tasks',
    completed: 'Completed',
    pending:   'Pending',
};

export default function Header({ filter }) {
    const { logout, getUser } = useAuth();
    const user = getUser();
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <div className="px-4 md:px-9 pt-6 md:pt-9 pb-4 md:pb-5 border-b border-gray-100 flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{titles[filter]}</h2>
                    <p className="text-gray-400 text-base mt-1">{formatDate()}</p>
                </div>
                <div className="flex items-center gap-3 mt-1">
                    {user && (
                        <span className="text-sm text-gray-500 font-medium">
                            {user.first_name} {user.last_name}
                        </span>
                    )}
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {showConfirm && (
                <LogoutConfirmModal
                    onConfirm={logout}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
}