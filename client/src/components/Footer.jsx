import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-auto relative z-10 w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 py-12 px-6 transition-colors duration-500">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Link to="/" className="flex items-center gap-2 group w-fit">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                            ✨
                        </div>
                        <h2 className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                            Mindora<span className="text-indigo-500">.ai</span>
                        </h2>
                    </Link>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
                        Clarity for your mind, peace for your soul. 
                        Your secure, private wellness space to track moods, journal, and grow.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-wider">Features</h3>
                    <div className="flex flex-col gap-2">
                        <Link to="/mood" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mood Tracker</Link>
                        <Link to="/journal" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mindful Journaling</Link>
                        <Link to="/chat" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI Companion</Link>
                        <Link to="/dashboard" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Insights</Link>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-wider">Company</h3>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a>
                        <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
            
            <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                    © {new Date().getFullYear()} Mindora.ai. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Twitter</a>
                    <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Instagram</a>
                    <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
