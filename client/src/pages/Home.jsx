// pages/Home.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-6 overflow-hidden relative selection:bg-indigo-200">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-4xl mx-auto relative z-10 pt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-slate-700 shadow-sm mb-8 backdrop-blur-md"
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Your secure, private wellness space</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
                >
                    Clarity for your mind, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                        peace for your soul.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium"
                >
                    Track your moods, reflect through journaling, and discover patterns in your mental well-being with our serene platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Link to="/mood" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 text-lg">
                        Check In Now
                    </Link>
                    <Link to="/dashboard" className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-semibold shadow-sm hover:shadow-md transition-all hover:bg-slate-50 dark:hover:bg-slate-700 text-lg">
                        View Dashboard
                    </Link>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="grid md:grid-cols-3 gap-6 mt-24 text-left"
                >
                    {[
                        { title: "Mood Tracking", icon: "✨", desc: "Log your daily feelings with our intuitive interface. Understand what drives your emotional state." },
                        { title: "Mindful Journaling", icon: "📖", desc: "A private, distraction-free space to reflect on your day and process complex thoughts." },
                        { title: "Deep Insights", icon: "📊", desc: "Visualize your progress over time with beautiful, easy-to-understand charts and analytics." }
                    ].map((item) => (
                        <div key={item.title}
                            className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-2xl rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}