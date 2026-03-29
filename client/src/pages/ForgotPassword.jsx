import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { forgotPassword, isLoading, error, clearError } = useAuthStore();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            console.error("Forgot password error:", err);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 relative flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-300/30 dark:bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center text-white text-3xl shadow-lg shadow-indigo-500/30 mb-6 transition-transform hover:scale-105">
                        🔑
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        Reset Password
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        We'll send you an email to reset your password
                    </p>
                </div>

                <div className="glass-card p-10 rounded-[2.5rem] space-y-6 shadow-xl">
                    {submitted ? (
                        <div className="text-center space-y-4">
                            <div className="text-5xl">📧</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Check your email
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                We've sent a password reset link to <span className="font-semibold text-indigo-600 dark:text-indigo-400">{email}</span>
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-500">
                                The link will expire in 1 hour. If you don't see the email, check your spam folder.
                            </p>
                            <div className="pt-4 space-y-2">
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="w-full text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                                >
                                    Try another email
                                </button>
                                <Link
                                    to="/login"
                                    className="block w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-2xl text-center transition-all"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                                    {typeof error === 'string' ? error : error.message || 'An error occurred'}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? <Spinner /> : 'Send Reset Link'}
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Remember your password?{' '}
                                    <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
