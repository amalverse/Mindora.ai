import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
    const { pathname } = useLocation();
    const { user, logout } = useAuthStore();
    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved === "dark") {
                document.documentElement.classList.add("dark");
                return true;
            }
        }
        return false;
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    const navItem = (path, name, isMobile = false) => (
        <Link
            to={path}
            onClick={() => setIsMenuOpen(false)}
            className={`relative px-4 py-2 rounded-full transition-all duration-300
                ${isMobile
                    ? "w-full text-center text-lg py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    : "text-sm font-medium"
                }
                ${pathname === path
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
        >
            {name}
            {pathname === path && !isMobile && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-indigo-500 rounded-t-full transition-all duration-300" />
            )}
        </Link>
    );

    return (
        <>
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[98%] max-w-5xl z-[60] glass rounded-2xl px-6 py-4 flex justify-between items-center transition-all duration-500">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                        ✨
                    </div>
                    <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                        Mindora<span className="text-indigo-500">.ai</span>
                    </h1>
                </Link>

                <div className="hidden md:flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    {navItem("/", "Home")}
                    {navItem("/mood", "Mood")}
                    {navItem("/journal", "Journal")}
                    {navItem("/dashboard", "Dashboard")}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* User Profile / Auth Buttons */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800 focus:outline-none transition-transform hover:scale-105 overflow-hidden">
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        user.name ? user.name.charAt(0).toUpperCase() : "U"
                                    )}
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden z-70">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
                                            Profile
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors mt-1"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                                    Sign In
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="inline-flex sm:hidden items-center justify-center w-10 h-10 text-xl transition-all duration-300 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md">
                                    🚀
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-500/20">
                                    Join
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        aria-label="Toggle Theme"
                    >
                        {dark ? "🌙" : "☀️"}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`fixed inset-x-4 top-24 z-50 md:hidden glass rounded-3xl p-6 transition-all duration-300 transform origin-top ${isMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                }`}>
                <div className="flex flex-col gap-2">
                    {navItem("/", "Home", true)}
                    {navItem("/mood", "Mood Tracking", true)}
                    {navItem("/journal", "My Journal", true)}
                    {navItem("/dashboard", "Analytics", true)}

                    {!user && (
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Link to="/login" className="flex items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
                                Login
                            </Link>
                            <Link to="/register" className="flex items-center justify-center p-3 rounded-2xl bg-indigo-600 text-white font-bold">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Backdrop for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
}
