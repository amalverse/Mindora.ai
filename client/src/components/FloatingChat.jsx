import { useState } from "react";
import ChatModal from "./ChatModal";
import { useAuthStore } from "../store/authStore";

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[90] pointer-events-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`group w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative overflow-hidden ${
                        isOpen 
                            ? "bg-slate-800 dark:bg-slate-700 hover:scale-95 text-white" 
                            : "bg-indigo-600 dark:bg-indigo-500 hover:scale-110 text-white"
                    }`}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    {/* Animated Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    {isOpen ? (
                        <svg className="w-8 h-8 relative z-10 animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-3xl animate-bounce">🤖</span>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-500 animate-pulse"></span>
                        </div>
                    )}

                    {/* Notification Tooltip */}
                    {!isOpen && (
                        <div className="absolute top-[-40px] right-0 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap translate-y-2 group-hover:translate-y-0 transform">
                            Chat with Mindora AI ✨
                        </div>
                    )}
                </button>
            </div>

            <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
