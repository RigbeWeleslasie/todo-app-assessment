export default function DeleteConfirmModal({ taskTitle, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onCancel}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-80 flex flex-col items-center gap-4 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">Delete Task?</h3>
                    <p className="text-gray-400 text-sm mt-1">
                        <span className="font-medium text-gray-600">"{taskTitle}"</span> will be permanently removed.
                    </p>
                </div>
                <div className="flex gap-3 w-full mt-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-2xl text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                        Keep it
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
