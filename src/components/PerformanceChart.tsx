"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DailyData } from "@/data/mockData";

interface Props {
  data: DailyData[];
}

type Metric = "messages" | "clics" | "appels" | "favoris";

// Data viz: varying opacities of the primary blue — no hue shifts.
const PRIMARY = "#4a6fe8";
const METRICS: { key: Metric; label: string; color: string }[] = [
  { key: "messages", label: "Messages reçus", color: PRIMARY },
  { key: "clics", label: "Clics annonces", color: "rgba(74,111,232,0.8)" },
  { key: "appels", label: "Intentions appel", color: "rgba(74,111,232,0.62)" },
  { key: "favoris", label: "Favoris", color: "rgba(74,111,232,0.45)" },
];

export default function PerformanceChart({ data }: Props) {
  const [activeMetric, setActiveMetric] = useState<Metric>("messages");
  const metric = METRICS.find((m) => m.key === activeMetric)!;

  const chartData = data.slice(-14).map((d) => ({
    date: d.date,
    value: d[activeMetric],
  }));

  return (
    <div className="bg-surface rounded-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <p className="t-body-md text-ink-secondary">Afficher les données par :</p>
        <div className="flex gap-2 flex-wrap">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`t-label-md px-3 py-1.5 rounded-full border transition-colors ${
                activeMetric === m.key
                  ? "bg-primary text-white border-primary"
                  : "text-ink-secondary border-border-input hover:border-primary hover:text-primary"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e6ee" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#8a91a8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#8a91a8" }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(15,27,61,0.1)", fontSize: 13 }}
            cursor={{ fill: "#eef1f6" }}
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
