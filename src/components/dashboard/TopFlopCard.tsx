"use client";
import { useState } from "react";
import { Trophy, TrendingDown, MapPin } from "lucide-react";
import { rankAffiliates, AffiliateMetric, Affiliate } from "@/data/affiliates";
import { TOPFLOP_METRICS } from "@/data/dashboardData";
import { TONE, SignalBars, SectionLink, InfoHint, scoreTone, leadCostTone } from "./ui";

function metricTone(a: Affiliate, metric: AffiliateMetric) {
  return metric === "leadCost" ? leadCostTone(a.leadCost) : scoreTone(a[metric]);
}

function metricBadge(a: Affiliate, metric: AffiliateMetric): string {
  switch (metric) {
    case "roi": return `ROI ${a.roi}`;
    case "prix": return `Prix ${a.prix}`;
    case "reactivite": return `Réac. ${a.reactivite}`;
    case "qualite": return `Qualité ${a.qualite}`;
    case "leadCost": return `${a.leadCost.toFixed(2).replace(".", ",")} €/lead`;
  }
}

export default function TopFlopCard() {
  const [tab, setTab] = useState<"top" | "flop">("top");
  const [metric, setMetric] = useState<AffiliateMetric>("roi");

  const ranked = rankAffiliates(metric);
  const list = tab === "top" ? ranked.slice(0, 5) : ranked.slice(-5).reverse();

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start justify-between mb-1">
        <h2 className="t-headline-md">Top / Flop filiales</h2>
        <SectionLink>Voir tout →</SectionLink>
      </div>
      <p className="t-caption text-ink-muted mb-4">
        Classement par · {TOPFLOP_METRICS.find((m) => m.key === metric)?.label}
      </p>

      {/* Tabs Top / Flop */}
      <div className="flex gap-2 mb-3">
        {([["top", Trophy, "Top performers"], ["flop", TrendingDown, "Flop"]] as const).map(
          ([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full t-label-md font-semibold transition-colors ${
                tab === key ? "bg-primary text-white" : "bg-app text-ink-secondary hover:text-ink"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          )
        )}
      </div>

      {/* Metric filter chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {TOPFLOP_METRICS.map((m) => {
          const active = metric === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`inline-flex items-center gap-1 pl-3 pr-2.5 py-1 rounded-full t-caption font-medium border transition-colors ${
                active
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border-input text-ink-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {m.label}
              <InfoHint text={m.definition} />
            </button>
          );
        })}
      </div>

      <ul>
        {list.map((a, i) => {
          const tone = metricTone(a, metric);
          return (
            <li key={a.id} className="flex items-center justify-between gap-4 py-3 border-b border-border-base last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="t-label-md text-ink-muted w-4 text-center flex-shrink-0">{i + 1}</span>
                <div className="min-w-0">
                  <p className="t-headline-sm truncate">{a.name}</p>
                  <p className="t-caption text-ink-muted flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="flex-shrink-0" />
                    {a.city} · {a.adsCount} annonces
                    <span className={`font-bold ${TONE[tone].text}`}>· {metricBadge(a, metric)}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="flex items-center gap-1.5 t-label-md font-semibold text-ink whitespace-nowrap">
                  <span className={`w-2 h-2 rounded-full ${TONE[tone].dot}`} />
                  {a.leads} leads · {a.leadCost.toFixed(2).replace(".", ",")} €/lead
                </span>
                <SignalBars tone={tone} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
