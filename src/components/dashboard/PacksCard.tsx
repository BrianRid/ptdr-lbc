"use client";
import { PACKS } from "@/data/dashboardData";
import { SectionLink } from "./ui";

export default function PacksCard() {
  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start justify-between mb-1">
        <h2 className="t-headline-md">Souscrire des packs</h2>
        <SectionLink>Tout voir →</SectionLink>
      </div>
      <p className="t-caption text-ink-muted mb-4">Offres disponibles depuis votre espace PTDR</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PACKS.map((p) => (
          <div
            key={p.name}
            className={`rounded-field p-4 border transition-colors ${
              p.recommended ? "border-primary bg-primary/[0.04]" : "border-border-base hover:border-border-input"
            }`}
          >
            {p.recommended && (
              <span className="inline-block mb-2 t-caption font-bold text-white bg-primary rounded-full px-2 py-0.5">
                Recommandé
              </span>
            )}
            <p className="t-label-md font-bold text-ink">{p.name}</p>
            <p className="t-caption text-ink-muted mt-1 leading-snug">{p.desc}</p>
            <p className="mt-3">
              <span className="t-headline-sm font-bold text-ink">{p.price}</span>
              <span className="t-caption text-ink-muted"> / mois</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
