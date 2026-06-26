"use client";
import { AlertCircle, AlertTriangle, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";
import { INSIGHTS, Insight } from "@/data/dashboardData";

const STYLE: Record<
  Insight["tone"],
  { card: string; label: string; dot: string; btn: string; Icon: typeof AlertCircle }
> = {
  red: {
    card: "bg-alert/[0.05] border-alert/20", label: "text-alert", dot: "bg-alert",
    btn: "bg-alert hover:brightness-95 text-white", Icon: AlertCircle,
  },
  amber: {
    card: "bg-potential-mid/10 border-potential-mid/30", label: "text-[#B26A07]", dot: "bg-potential-mid",
    btn: "bg-potential-mid hover:brightness-95 text-white", Icon: AlertTriangle,
  },
  green: {
    card: "bg-potential-high/[0.08] border-potential-high/25", label: "text-potential-high", dot: "bg-potential-high",
    btn: "bg-potential-high hover:brightness-95 text-white", Icon: TrendingUp,
  },
  blue: {
    card: "bg-primary/[0.05] border-primary/20", label: "text-primary", dot: "bg-primary",
    btn: "bg-primary hover:bg-primary-strong text-white", Icon: Lightbulb,
  },
};

function Card({ insight }: { insight: Insight }) {
  const s = STYLE[insight.tone];
  const Icon = s.Icon;
  return (
    <div className={`rounded-card border p-4 flex flex-col ${s.card}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1.5 t-caption font-bold uppercase tracking-wider ${s.label}`}>
          <Icon size={13} />
          {insight.label}
        </span>
        <span className="t-caption font-bold text-ink-muted bg-ink/[0.06] rounded-full px-1.5 py-0.5 leading-none">IA</span>
      </div>

      <p className="t-label-md font-bold text-ink leading-snug">{insight.title}</p>
      <p className="t-caption text-ink-secondary leading-snug mt-1.5 flex-1">{insight.body}</p>

      <button className={`mt-3 inline-flex items-center justify-center gap-1.5 self-start rounded-full px-3.5 py-2 t-caption font-semibold transition-colors ${s.btn}`}>
        {insight.cta}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

export default function InsightCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {INSIGHTS.map((i) => (
        <Card key={i.key} insight={i} />
      ))}
    </div>
  );
}
