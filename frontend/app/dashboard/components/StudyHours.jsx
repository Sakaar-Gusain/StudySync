// components/ScoreTrendChart.jsx
"use client"

import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function StudyHours({ studentId }) {
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
        const json = await res.json();

        
         const formatted = json.map((entry) => {
          return {
            study_hours:entry.study_hours_per_day,
            predicted_score: entry.predicted_score,
          }
        }).sort((a, b) => a.study_hours - b.study_hours);
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
      <h2 className="text-zinc-200 text-sm font-semibold mb-2">Marks per Study Hours</h2>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46"  />
            <XAxis dataKey="study_hours" name="Study Hours" padding={{ left: 30, right: 30, top:20}} stroke="#a1a1aa" fontSize={12} type="number" />
            <YAxis dataKey="predicted_score" name="Predicted score" stroke="#a1a1aa" fontSize={12} domain={[0, 100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#3b82f6" />
      </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}