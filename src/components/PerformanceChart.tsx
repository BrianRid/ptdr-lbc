"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DailyData } from "@/data/mockData";

interface Props {
  data: DailyData[];
}

type Metric = "messages" | "clics" | "appels" | "favoris";

const METRICS: { key: Metric; label: string; color: string }[] = [
  { key: "messages", label: "Messages reçus", color: "#3b5bdb" },
  { key: "clics", label: "Clics annonces", color: "#0d9488" },
  { key: "appels", label: "Intentions appel", color: "#f59e0b" },
  { key: "favoris", label: "Favoris", color: "#ec4899" },
];

export default function PerformanceChart({ data }: Props) {
  const [activeMetric, setActiveMetric] = useState<Metric>("messages");
  const metric = METRICS.find((m) => m.key === activeMetric)!;

  const chartData = data.slice(-14).map((d) => ({
    date: d.date,
    value: d[activeMetric],
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">Afficher les données par :</p>
        <div className="flex gap-2 flex-wrap">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                activeMetric === m.key
                  ? "bg-[#3b5bdb] text-white border-[#3b5bdb]"
                  : "text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontSize: 13 }}
            cursor={{ fill: "#f8fafc" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
            formatter={() => metric.label}
          />
          <Bar dataKey="value" name={metric.label} fill={metric.color} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
