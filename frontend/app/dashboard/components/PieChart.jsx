"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { useState, useEffect } from "react";
const COLORS = {
    study_hours: "#3b82f6",
    social_media_hours: "#f97316",
    netflix_hours: "#ec4899",
    sleep_hours: "#22c55e",
    free_time: "#71717a"
}

const LABEL = {
    study_hours: "Study",
    social_media_hours: "Social media",
    netflix_hours: "Netflix",
    sleep_hours: "Sleep",
    free_time: "Free time"
}

export default function PieChartHrs({ studentId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!studentId) return;
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard?student_id=${studentId}`
                );
                if (!res.ok) throw new Error("Failed to fetch dashboard data");
                const records = await res.json();

                if (records.length === 0) {
                    setData([]);
                    return;
                }


                const totals = records.reduce(
                    (acc, r) => {
                        acc.study_hours += r.study_hours_per_day || 0;
                        acc.social_media_hours += r.social_media_hours || 0;
                        acc.netflix_hours += r.netflix_hours || 0;
                        acc.sleep_hours += r.sleep_hours || 0;
                        return acc;
                    },
                    { study_hours: 0, social_media_hours: 0, netflix_hours: 0, sleep_hours: 0 }
                );



                const n = records.length;
                const averages = Object.keys(totals).reduce((acc, key) => {
                    acc[key] = totals[key] / n;
                    return acc;
                }, {});

                const trackedHours = Object.values(averages).reduce((sum, v) => sum + v, 0);
                const freeTime = Math.max(0, 24 - trackedHours);

                const formatted = [
                    ...Object.keys(totals).map((key) => ({
                        key,
                        name: LABEL[key],
                        value: Number((totals[key] / n).toFixed(1)),

                    })),
                    { key: "free_time", name: LABEL.free_time, value: Number(freeTime.toFixed(1)) },
                ];

                setData(formatted);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    if (loading) return <p className="text-center text-zinc-400 p-4">Loading chart...</p>;
    if (error) return <p className="text-center text-red-400 p-4">{error}</p>;
    if (data.length === 0) return <p className="text-center text-zinc-400 p-4">No data yet.</p>;

    return (
        <div className="bg-zinc-900/40 rounded-xl p-4  shadow-md shadow-black w-full h-80">

            <h2 className="text-zinc-200 text-sm font-semibold mb-2">Average Daily Time Distribution </h2>

            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie 
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        label={({ name, value }) => `${name}: ${value}h`}
                        labelLine={false}
                    >
                        {data.map((entry) => (
                            <Cell key={entry.key} fill={COLORS[entry.key]} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => [`${value} hrs`, name]}
                        contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={24}
                        formatter={(value) => <span className="text-zinc-300 text-xs">{value}</span>}
                    />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}