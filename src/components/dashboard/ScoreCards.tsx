"use client";
import { Target, Banknote, Zap, Star, Coins } from "lucide-react";
import { ScoreCard } from "@/data/dashboardData";
import { TONE, TrendBadge, InfoHint, boldSegments } from "./ui";

const ICONS: Record<string, typeof Target> = {
  roi: Target, prix: Banknote, reactivite: Zap, qualite: Star, cpl: Coins,
};

function Card({ card }: { card: ScoreCard }) {
  const tone = TONE[card.tone];
  const Icon = ICONS[card.key] ?? Target;
  return (
    <div className="bg-surface rounded-card shadow-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <span className={`w-10 h-10 rounded-thumb flex items-center justify-center ${tone.soft}`}>
          <Icon size={18} className={tone.text} />
        </span>
        <TrendBadge dir={card.trendDir} label={card.trend} />
      </div>

      <div>
        <p className="flex items-baseline gap-1">
          {card.kind === "score" ? (
            <>
              <span className="text-[30px] font-bold leading-none tracking-tight text-ink tabular-nums">{card.score}</span>
              <span className="t-body-md text-ink-muted">/100</span>
            </>
          ) : (
            <span className="text-[30px] font-bold leading-none tracking-tight text-ink tabular-nums">{card.display}</span>
          )}
        </p>
        <p className="t-caption text-ink-muted mt-1.5 flex items-center gap-1">
          {card.label}
          <InfoHint text={card.definition} />
        </p>
      </div>

      {card.kind === "score" ? (
        <div className="h-1.5 rounded-full bg-app overflow-hidden">
          <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${card.score}%` }} />
        </div>
      ) : (
        <p className="t-caption text-ink-muted leading-snug">
          {card.footnote ? boldSegments(card.footnote) : null}
        </p>
      )}
    </div>
  );
}

export default function ScoreCards({ scores }: { scores: ScoreCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {scores.map((c) => (
        <Card key={c.key} card={c} />
      ))}
    </div>
  );
}
