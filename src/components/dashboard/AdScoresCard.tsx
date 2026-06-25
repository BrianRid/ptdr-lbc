"use client";
import { useState, useMemo } from "react";
import { Car, ChevronDown } from "lucide-react";
import { AD_SCORES } from "@/data/dashboardData";
import { TONE, SectionLink, scoreTone } from "./ui";

function ScoreTag({ label, value }: { label: string; value: number }) {
  const tone = TONE[scoreTone(value)];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 t-caption font-semibold ${tone.soft} ${tone.text}`}>
      {label} {value}
    </span>
  );
}

export default function AdScoresCard() {
  const [filiale, setFiliale] = useState("all");

  const filiales = useMemo(() => [...new Set(AD_SCORES.map((a) => a.filiale))], []);
  const rows = filiale === "all" ? AD_SCORES : AD_SCORES.filter((a) => a.filiale === filiale);

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h2 className="t-headline-md">Scores par annonce</h2>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <select
              value={filiale}
              onChange={(e) => setFiliale(e.target.value)}
              className="appearance-none bg-surface border border-border-input rounded-full pl-3.5 pr-8 py-2 t-label-md font-medium text-ink cursor-pointer hover:border-ink-muted transition-colors focus:outline-none"
            >
              <option value="all">Filtrer par filiale</option>
              {filiales.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
          <SectionLink>Voir tout →</SectionLink>
        </div>
      </div>
      <p className="t-caption text-ink-muted mb-4">
        ROI détaillé · positionnement prix, réactivité leads, qualité — toutes filiales
      </p>

      <ul>
        {rows.map((a, i) => (
          <li key={`${a.model}-${i}`} className="flex items-center justify-between gap-4 py-3 border-b border-border-base last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-10 h-10 rounded-thumb flex items-center justify-center flex-shrink-0 ${TONE[a.tone].soft}`}>
                <Car size={18} className={TONE[a.tone].text} />
              </span>
              <div className="min-w-0">
                <p className="t-headline-sm truncate">
                  {a.model} — {a.year} · {a.km}
                </p>
                <p className="t-caption text-ink-muted mt-0.5 truncate">
                  {a.filiale} · Publiée {a.ago} · {a.views} vues · {a.leads} lead{a.leads > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ScoreTag label="Prix" value={a.prix} />
              <ScoreTag label="Leads" value={a.leadsScore} />
              <ScoreTag label="Qualité" value={a.qualite} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
