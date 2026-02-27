import { Link } from 'react-router-dom';
import useLoginForm from '../hooks/useLoginForm';

export default function Login() {
    const {
        email, setEmail,
        password, setPassword,
        loading, error, setError,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-md p-8">
                <div className="mb-8 text-center">
                    <img
                        src="/favicon.ico"
                        alt="logo"
                        className="w-16 h-16 mx-auto mb-4 rounded-2xl shadow-md"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="ml-4 text-red-400 hover:text-red-600">✕</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-4 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-500 font-semibold hover:text-emerald-600">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}