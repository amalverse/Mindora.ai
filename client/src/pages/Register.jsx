import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await register(form.name, form.email, form.password);
            navigate("/login");
        } catch (err) {
            console.error("Register error:", err);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 relative flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-emerald-200/30 dark:bg-emerald-900/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        Join Mindora.ai
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Begin your journey to better mental health today.
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
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                required
                                value={form.name}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                placeholder="John Doe"
                            />
                        </div>

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
                            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                Password
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
                                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-slate-900/20 dark:shadow-indigo-500/30 transition-all hover:shadow-slate-900/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <Spinner /> : 'Create Account'}
                    </button>
                    
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
