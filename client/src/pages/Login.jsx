import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login, isLoading, user, error, clearError } = useAuthStore();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Google OAuth endpoint
        const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
        const oauthUrl = `${baseUrl}/auth/google`;
        console.log('OAuth URL:', oauthUrl);
        window.location.href = oauthUrl;
    };

    const handleGitHubLogin = () => {
        // Redirect to GitHub OAuth endpoint
        const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
        const oauthUrl = `${baseUrl}/auth/github`;
        console.log('OAuth URL:', oauthUrl);
        window.location.href = oauthUrl;
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 relative flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-300/30 dark:bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center text-white text-3xl shadow-lg shadow-indigo-500/30 mb-6 transition-transform hover:scale-105">
                        ✨
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Continue your wellness journey.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[2.5rem] space-y-6 shadow-xl">
                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                            {typeof error === 'string' ? error : error.message || 'An error occurred'}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <Spinner /> : 'Sign In'}
                    </button>

                    {/* OAuth Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">or continue with</span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm font-medium hidden sm:inline">Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleGitHubLogin}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-sm font-medium hidden sm:inline">GitHub</span>
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
