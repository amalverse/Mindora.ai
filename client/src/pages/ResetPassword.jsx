import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const { resetPassword, isLoading, error, clearError } = useAuthStore();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) clearError();

        // Check if passwords match
        if (name === "password") {
            setPasswordsMatch(value === form.confirmPassword || form.confirmPassword === "");
        } else if (name === "confirmPassword") {
            setPasswordsMatch(form.password === value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordsMatch || !form.password || !form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await resetPassword(token, form.password, form.confirmPassword);
            setSubmitted(true);
        } catch (err) {
            console.error("Reset password error:", err);
        }
    };

    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 relative flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-300/30 dark:bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center text-white text-3xl shadow-lg shadow-indigo-500/30 mb-6 transition-transform hover:scale-105">
                        🔐
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        Create New Password
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Enter a new password to secure your account
                    </p>
                </div>

                <div className="glass-card p-10 rounded-[2.5rem] space-y-6 shadow-xl">
                    {submitted ? (
                        <div className="text-center space-y-4">
                            <div className="text-5xl">✅</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Password Reset Successfully!
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Your password has been reset. You can now sign in with your new password.
                            </p>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-2xl transition-all mt-4"
                            >
                                Sign In
                            </button>
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
                                    New Password
                                </label>
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
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Must be at least 6 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    Confirm Password
                                </label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={`w-full bg-slate-50/50 dark:bg-slate-900/50 border px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 ${
                                        passwordsMatch 
                                            ? 'border-slate-200 dark:border-slate-700' 
                                            : 'border-red-500 dark:border-red-500'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {!passwordsMatch && form.confirmPassword && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading || !passwordsMatch || !form.password}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? <Spinner /> : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
