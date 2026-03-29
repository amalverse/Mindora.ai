// pages/Journal.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { journalService } from "../services/journalService";

const PROMPTS = [
    "What made you smile today?",
    "What was a challenge you faced, and how did you handle it?",
    "Write about something you are grateful for right now.",
    "What is one thing you want to let go of today?",
    "How have you taken care of yourself today?"
];

// Simple mock sentiment analysis
const analyzeSentiment = (text) => {
    const positiveWords = ['happy', 'glad', 'great', 'awesome', 'good', 'smile', 'love', 'excited', 'peaceful'];
    const negativeWords = ['sad', 'bad', 'angry', 'upset', 'hate', 'tired', 'anxious', 'stress', 'overwhelmed'];

    const words = text.toLowerCase().split(/\W+/);
    let score = 0;
    words.forEach(word => {
        if (positiveWords.includes(word)) score++;
        if (negativeWords.includes(word)) score--;
    });

    if (score > 1) return { label: 'Positive', emoji: '✨', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' };
    if (score < -1) return { label: 'Struggling', emoji: '🌧️', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' };
    return { label: 'Neutral', emoji: '☁️', color: 'text-slate-500 bg-slate-50 dark:bg-slate-800' };
};

export default function Journal() {
    const [text, setText] = useState("");
    const [entries, setEntries] = useState([]);
    const [prompt, setPrompt] = useState(PROMPTS[0]);
    const [saving, setSaving] = useState(false);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [editingId, setEditingId] = useState(null);

    // Load entries from API on mount
    useEffect(() => {
        const loadEntries = async () => {
            try {
                const data = await journalService.getJournals();
                setEntries(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load journal entries:", err);
            } finally {
                setLoadingEntries(false);
            }
        };
        loadEntries();
    }, []);

    const cyclePrompt = () => {
        setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    };

    const handleEdit = (entry) => {
        setEditingId(entry._id || entry.id);
        setText(entry.content || entry.text);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setText("");
    };

    const deleteEntry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this memory?")) return;

        try {
            await journalService.deleteJournal(id);
            setEntries(prev => prev.filter(e => (e._id || e.id) !== id));
            toast.success("Entry removed.");
            if (editingId === id) cancelEdit();
        } catch {
            toast.error("Failed to delete entry.");
        }
    };

    const saveEntry = async () => {
        if (!text.trim()) {
            toast.error("Your entry is empty!");
            return;
        }

        const lines = text.trim().split("\n");
        const title = (lines[0] || "").slice(0, 60) || "Journal Entry";
        const content = text.trim();
        const sentiment = analyzeSentiment(text);

        try {
            setSaving(true);
            if (editingId) {
                const updated = await journalService.updateJournal(editingId, { title, content, moodContext: sentiment.label });
                setEntries(prev => prev.map(e => (e._id || e.id) === editingId ? { ...updated, sentiment } : e));
                toast.success("Entry updated.");
                setEditingId(null);
            } else {
                const saved = await journalService.createJournal({ title, content, moodContext: sentiment.label });
                setEntries(prev => [{ ...saved, sentiment }, ...prev]);
                toast.success("Entry saved successfully.");
                cyclePrompt();
            }
            setText("");
        } catch (err) {
            console.error("Failed to save journal entry:", err);
            toast.error(err?.message || "Failed to save entry. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mb-2">
                        Your Private Space
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">Write freely. Your thoughts are yours alone.</p>
                </div>

                {/* Composer */}
                <div className={`glass-card rounded-3xl p-6 md:p-8 transition-all duration-300 ${editingId ? 'ring-2 ring-indigo-500 shadow-indigo-500/10' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium flex-1 mr-4">
                            {editingId ? (
                                <span>✏️ Editing Entry</span>
                            ) : (
                                <>💡 <span className="italic">{prompt}</span></>
                            )}
                        </div>
                        {!editingId && (
                            <button
                                onClick={cyclePrompt}
                                className="text-slate-400 hover:text-indigo-500 transition-colors p-2"
                                title="Get a new prompt"
                            >
                                🔄
                            </button>
                        )}
                    </div>

                    <textarea
                        className="w-full h-48 p-4 bg-transparent border-none focus:ring-0 outline-none resize-none text-slate-700 dark:text-slate-200 text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="Start typing here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-x-3">
                            <span className="text-xs text-slate-400 font-medium tracking-wider uppercase mr-2">
                                {new Date().toLocaleDateString()}
                            </span>
                            {editingId && (
                                <button
                                    onClick={cancelEdit}
                                    className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                        <button
                            onClick={saveEntry}
                            disabled={saving}
                            className="bg-slate-800 dark:bg-indigo-600 hover:bg-slate-900 dark:hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all active:scale-95"
                        >
                            {saving ? "Saving..." : editingId ? "Update Entry" : "Save Entry"}
                        </button>
                    </div>
                </div>

                {/* History */}
                {loadingEntries ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
                    </div>
                ) : entries.length > 0 ? (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white pl-2 border-l-4 border-indigo-500">
                            Recent Thoughts
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {entries.map((e) => (
                                <div key={e._id || e.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-sm font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                                            {e.date || new Date(e.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {e.sentiment && (
                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${e.sentiment.color}`}>
                                                    {e.sentiment.emoji} {e.sentiment.label}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {e.title && <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 mb-2 uppercase tracking-wide">{e.title}</p>}
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm mb-4">
                                        {e.content || e.text}
                                    </p>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button
                                            onClick={() => handleEdit(e)}
                                            className="text-xs font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-tighter"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEntry(e._id || e.id)}
                                            className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-tighter"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}