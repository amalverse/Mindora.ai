import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../services/chatService";
import toast from "react-hot-toast";

export default function ChatModal({ isOpen, onClose }) {
    const [messages, setMessages] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                return JSON.parse(localStorage.getItem("chat")) || [];
            } catch { return [] }
        }
        return [];
    });
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef();

    const initialLoad = useRef(true);
    const prevMessageCount = useRef(messages.length);

    useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(messages));
        
        if (initialLoad.current) {
            initialLoad.current = false;
        } else if (messages.length > prevMessageCount.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        
        prevMessageCount.current = messages.length;
    }, [messages]);

    // Handle initial scroll when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "auto" });
            }, 100);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { type: "user", text: input, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setLoading(true);

        try {
            const botResponse = await sendChatMessage(currentInput);
            const botMsg = { type: "bot", text: botResponse, timestamp: new Date().toISOString() };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = typeof error === 'string' ? error : (error.message || "I'm having a bit of trouble connecting to my brain right now.");
            toast.error("AI is taking a breather...");
            const botMsg = {
                type: "bot",
                text: errorMessage,
                timestamp: new Date().toISOString()
            };
            setMessages((prev) => [...prev, botMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 sm:p-6 pointer-events-none">
            <div className="w-full sm:w-[440px] h-[600px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
                
                {/* Chat Header */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-slate-800/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20">
                            🤖
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800 dark:text-white text-sm">Mindora AI</h2>
                            <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                ONLINE
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => { setMessages([]); localStorage.removeItem("chat"); }}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="Clear Chat"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-100 dark:scrollbar-thumb-slate-800">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-3 px-6">
                            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-3xl">✨</div>
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">How can I help you today?</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                I'm here to support your mental wellness and personal growth journey.
                            </p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm ${
                                    msg.type === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200/30 dark:border-slate-700/30"
                                }`}
                            >
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} className="h-1" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative flex items-center">
                        <textarea
                            rows="1"
                            className="w-full p-3.5 pr-12 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all resize-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            className={`absolute right-1.5 p-2 rounded-xl transition-all ${
                                input.trim() && !loading 
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                                    : "text-slate-400 opacity-50"
                            }`}
                            disabled={loading || !input.trim()}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
