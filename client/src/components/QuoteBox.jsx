import { useState } from "react";

const quotes = [
    "You don't have to control your thoughts. You just have to stop letting them control you.",
    "Mental health needs a great deal of attention. It's the final taboo and it needs to be faced and dealt with.",
    "There is hope, even when your brain tells you there isn't.",
    "Self-care is how you take your power back.",
    "Healing takes time, and asking for help is a courageous step."
];

export default function QuoteBox({ className = "" }) {
    const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

    return (
        <div className={`glass-card p-6 rounded-3xl border-l-4 border-indigo-400 bg-indigo-50/30 dark:bg-indigo-900/10 ${className}`}>
            <p className="text-lg italic text-slate-700 dark:text-slate-200 font-medium">
                "{quote}"
            </p>
        </div>
    );
}
