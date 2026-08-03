"use client"

import { useState,useEffect } from "react"

const KPI_DEFS = [
    { key: "avg_study_hours", label: "Average Study Hours", icon: "✏️", color: "#3b82f6" },
    { key: "avg_attendance", label: "Average Attendance", icon: "📅", color: "#8b5cf6" },
    { key: "avg_sleep", label: "Average sleep", icon: "🛏️", color: "#f59e0b" },
    { key: "avg_predicted_score", label: "Average Prediction", icon: "💯", color: "#6b7280" },
    { key: "newest", label: "Latest Prediction", icon: "💯", color: "#6b7280" },

];

function KpiCard({ label, icon, value, color }) {

    return (
        
        <div className="bg-zinc-900/40 rounded-xl p-4 shadow-md shadow-black flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs sm:text-xs md:text-sm font-semibold"
                    style={{ background: color + "22", color }}
                >
                    {icon}
                </span>
                {label}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {value ?? "—"}
            </div>
        </div>
    );
}

export default function KPI_cards({studentId}) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return; // guard until id is available

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary?student_id=${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch summary");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
    }, []);

    if (loading) {
        return <p className="text-center text-zinc-400 p-4">Loading dashboard...</p>;
    }

    if (!data) {
        return <p className="text-center text-red-400 p-4">Failed to load dashboard data.</p>;
    }
    return (

        <div className="flex flex-wrap items-center md:justify-center gap-4 p-4 text-sm md:text-sm">
            {KPI_DEFS.map(({ key, label, icon, color, format }) => {
                const raw = data[key];
                const value =
                    raw == null
                        ? null
                        : format
                            ? format(raw)
                            : typeof raw === "number"
                                ? raw.toLocaleString()
                                : raw;
                return (
                    <KpiCard key={key} label={label} icon={icon} value={value} color={color} />
                );
            })}
        </div>
    
    );
}