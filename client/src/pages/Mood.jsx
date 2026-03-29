// pages/Mood.jsx
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { moodService } from "../services/moodService";

// Labels aligned with backend enum: Happy | Sad | Stressed | Relaxed
const moodData = [
    { emoji: "😀", label: "Happy", color: "from-green-100 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/20" },
    { emoji: "😌", label: "Calm", color: "from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/20" },
    { emoji: "😴", label: "Productive", color: "from-purple-100 to-fuchsia-50 dark:from-purple-900/40 dark:to-fuchsia-900/20" },
    { emoji: "😢", label: "Sad", color: "from-slate-200 to-slate-100 dark:from-slate-800/60 dark:to-slate-900/40" },
    { emoji: "😰", label: "Anxious", color: "from-orange-100 to-amber-50 dark:from-orange-900/40 dark:to-amber-900/20" },
    { emoji: "😡", label: "Angry", color: "from-red-100 to-rose-50 dark:from-red-900/40 dark:to-rose-900/20" },
];

const influenceFactors = ["Work", "Sleep", "Family", "Health", "Social", "Weather"];

export default function Mood() {
    const [selected, setSelected] = useState(null);
    const [intensity, setIntensity] = useState(5);
    const [factors, setFactors] = useState([]);
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);

    const bgGradient = useMemo(() => {
        const mood = moodData.find(m => m.emoji === selected);
        return mood ? mood.color : "from-slate-50 to-white dark:from-slate-900 dark:to-slate-950";
    }, [selected]);

    const toggleFactor = (factor) => {
        setFactors(prev => prev.includes(factor) ? prev.filter(f => f !== factor) : [...prev, factor]);
    };

    const saveMood = async () => {
        if (!selected) {
            toast.error("Please select a mood first!");
            return;
        }

        const moodLabel = moodData.find(m => m.emoji === selected)?.label;

        try {
            setSaving(true);
            await moodService.createMood({
                moodType: moodLabel,
                note: note || `Intensity: ${intensity}/10. Factors: ${factors.join(", ") || "None"}`,
            });
            toast.success("Mood check-in saved! You're doing great.");
            setSelected(null);
            setIntensity(5);
            setFactors([]);
            setNote("");
        } catch (err) {
            console.error("Failed to save mood:", err);
            toast.error(err?.message || "Failed to save mood. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={`min-h-screen pt-32 pb-16 px-6 transition-colors duration-1000 bg-gradient-to-br ${bgGradient}`}>
            <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mb-3">
                        How are you feeling right now?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">Taking a moment to pause and reflect is a win.</p>
                </div>

                {/* Mood Selection */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
                    {moodData.map((m) => (
                        <button
                            key={m.label}
                            onClick={() => setSelected(m.emoji)}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
                            ${selected === m.emoji
                                    ? "bg-white dark:bg-slate-800 shadow-md scale-105 border-2 border-indigo-500/50"
                                    : "bg-slate-100/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm border-2 border-transparent"}`}
                        >
                            <span className="text-4xl mb-2">{m.emoji}</span>
                            <span className={`text-sm font-medium ${selected === m.emoji ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                                {m.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Additional Inputs - fade in when mood selected */}
                <div className={`transition-all duration-700 space-y-8 ${selected ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none translate-y-4'}`}>

                    {/* Intensity Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span>Mild</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Intensity: {intensity}/10</span>
                            <span>Intense</span>
                        </div>
                        <input
                            type="range"
                            min="1" max="10"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Factors */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 block">What's affecting your mood?</h3>
                        <div className="flex flex-wrap gap-2">
                            {influenceFactors.map(factor => (
                                <button
                                    key={factor}
                                    onClick={() => toggleFactor(factor)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                                        ${factors.includes(factor)
                                            ? "bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                                            : "bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-indigo-400"}`}
                                >
                                    {factor}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <textarea
                            placeholder="Add more details about how you're feeling... (optional)"
                            className="w-full h-32 p-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={saveMood}
                        disabled={saving}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 active:scale-[0.98]"
                    >
                        {saving ? "Saving..." : "Save Check-in"}
                    </button>

                </div>
            </div>
        </div>
    );
}