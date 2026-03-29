// pages/Dashboard.jsx
import { useMemo, useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { moodService } from "../services/moodService";
import { journalService } from "../services/journalService";

// Simple Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-white">
                <p className="font-medium text-sm text-slate-300">{label}</p>
                <p className="font-bold text-indigo-400">Intensity: {payload[0].value}</p>
                {payload[0].payload.label && <p className="text-xs text-slate-400 mt-1">Mood: {payload[0].payload.label}</p>}
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const [moods, setMoods] = useState([]);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [moodsData, journalsData] = await Promise.all([
                    moodService.getMoods(),
                    journalService.getJournals()
                ]);
                setMoods(Array.isArray(moodsData) ? moodsData : []);
                setJournals(Array.isArray(journalsData) ? journalsData : []);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                setMoods([]);
                setJournals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = useMemo(() => {
        const streak = moods.length > 0 ? Array.from(new Set(moods.map(m => new Date(m.createdAt || m.timestamp).toLocaleDateString()))).length : 0;
        const intensityMap = {
            "Happy": 9,
            "Productive": 8,
            "Calm": 7,
            "Relaxed": 7, // Fallback for old data
            "Anxious": 4,
            "Stressed": 4, // Fallback for old data 
            "Sad": 3,
            "Angry": 2
        };
        const avgIntensity = moods.length > 0 ? (moods.reduce((acc, m) => acc + (intensityMap[m.moodType] || 5), 0) / moods.length).toFixed(1) : "-";

        return [
            { label: "Check-ins", value: moods.length.toString(), icon: "📝" },
            { label: "Journal Entries", value: journals.length.toString(), icon: "📖" },
            { label: "Current Streak", value: `${streak} days`, icon: "🔥" },
            { label: "Avg Intensity", value: avgIntensity, icon: "📊" },
        ];
    }, [moods, journals]);

    const chartData = useMemo(() => {
        // Group by day to create a smooth trendline
        if (moods.length === 0) {
            return [
                { day: "Day 1", intensity: 5 },
                { day: "Day 2", intensity: 7 },
                { day: "Day 3", intensity: 4 },
                { day: "Day 4", intensity: 6 },
                { day: "Day 5", intensity: 8 },
                { day: "Day 6", intensity: 5 },
                { day: "Day 7", intensity: 7 }
            ];
        }
        const intensityMap = {
            "Happy": 9,
            "Productive": 8,
            "Calm": 7,
            "Relaxed": 7,
            "Anxious": 4,
            "Stressed": 4,
            "Sad": 3,
            "Angry": 2
        };

        return moods.slice(-14).map(m => ({
            day: new Date(m.createdAt || m.timestamp || m.date).toLocaleDateString('en-US', { weekday: 'short' }),
            intensity: intensityMap[m.moodType] || 5,
            label: m.moodType || "Check-in"
        }));
    }, [moods]);


    return (
        <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mb-2">
                            Your Wellness Insights
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Track your journey and notice the patterns.</p>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {stats.map((item) => (
                                <div key={item.label} className="glass-card rounded-3xl p-6 flex flex-col justify-between">
                                    <div className="text-2xl mb-4 bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{item.value}</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart Section */}
                        <div className="glass-card rounded-3xl p-6 md:p-8 mt-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Mood Trend</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Your latest mood check-ins visualised over time</p>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="day"
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0, 10]}
                                            ticks={[0, 2, 4, 6, 8, 10]}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="intensity"
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorIntensity)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}