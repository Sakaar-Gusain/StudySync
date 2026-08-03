"use client"

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload; 

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs">
      <p className="text-zinc-300 font-semibold mb-1">
        Predicted Score: <span className="text-amber-400">{point.predicted_score}</span>
      </p>
      <p className="text-zinc-500">{point.date}</p>
    </div>
  );
}

export default function ScoreTrendChart({ studentId }) {
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
          const dt = new Date(entry.created_at);
          return {
            date: dt.toLocaleDateString("en-US", { month: "short", day: "numeric",hour:"2-digit",minute:"2-digit" }),
            predicted_score: entry.predicted_score,
          }
        });

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
      <h2 className="text-zinc-200 text-sm font-semibold mb-2">Score Trends over the time</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} padding={{ left: 30, right: 30 }} />
          <YAxis stroke="#a1a1aa" fontSize={12} type="number" domain={[0, 100]} />
          <Tooltip
            content={<CustomTooltip/>}
          />
          <Legend />
          <Line
            type="linear"
            dataKey="predicted_score"
            name="Predicted Score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}