"use client";
import { BarChart3, ArrowUp } from "lucide-react";
import { DashboardData } from "@/data/dashboardData";
import { TONE, TrendBadge, SectionLink, boldSegments } from "./ui";

export default function MarketCard({ data }: { data: DashboardData }) {
  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start justify-between mb-1">
        <h2 className="t-headline-md">Données de marché</h2>
        <SectionLink>Détail →</SectionLink>
      </div>
      <p className="t-caption text-ink-muted mb-4">Votre réseau vs concurrence · même taille / département</p>

      <div className="flex items-start gap-2 bg-info-bg rounded-field px-4 py-3 mb-5">
        <BarChart3 size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="t-body-md text-ink">
          {boldSegments(data.banner)} en {data.bannerRegion} cette semaine
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {data.market.map((m) => (
          <div key={m.key}>
            <div className="flex items-center justify-between mb-2 gap-3">
              <p className="t-label-md font-semibold text-ink">{m.label}</p>
              <TrendBadge dir={m.trendDir} label={m.trendLabel} />
            </div>
            <div className="h-2 rounded-full bg-app overflow-hidden">
              <div className={`h-full rounded-full ${TONE[m.barTone].bar}`} style={{ width: `${m.barPct}%` }} />
            </div>
            <p className="t-caption text-ink-muted mt-1.5">{m.detail}</p>
          </div>
        ))}

        <div className="pt-4 border-t border-border-base">
          <div className="flex items-center justify-between">
            <p className="t-label-md font-semibold text-ink">Modèles tendance (marché)</p>
            <SectionLink>Mes filiales →</SectionLink>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {data.trendingModels.map((m) => (
              <span key={m.name} className="inline-flex items-center gap-1.5 bg-app rounded-full px-3 py-1 t-caption font-medium text-ink-secondary">
                {m.name}
                <span className="inline-flex items-center gap-0.5 text-potential-high font-semibold">
                  <ArrowUp size={11} />
                  {m.pct}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
