"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, ArrowRight } from "lucide-react";
import { NETWORK, AFFILIATES, TOTAL_ADS } from "@/data/affiliates";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 340 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* trend card */}
      <rect x="8" y="20" width="150" height="70" rx="12" fill="#E8EDFC" />
      <path d="M28 72 L58 50 L84 60 L122 30" stroke="#4A6FE8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 30 H126 V44" stroke="#4A6FE8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* eye badge */}
      <rect x="40" y="104" width="92" height="34" rx="17" fill="#FFFFFF" stroke="#D5DAE5" />
      <circle cx="61" cy="121" r="8" fill="none" stroke="#4A6FE8" strokeWidth="3" />
      <circle cx="61" cy="121" r="2.6" fill="#4A6FE8" />
      <text x="80" y="126" fontFamily="var(--font-jakarta)" fontSize="15" fontWeight="700" fill="#1A1F36">94</text>
      {/* pie chart */}
      <circle cx="250" cy="78" r="56" fill="#0F1B3D" />
      <path d="M250 78 L250 22 A56 56 0 0 1 300 103 Z" fill="#FD6621" />
      <path d="M250 78 L300 103 A56 56 0 0 1 232 132 Z" fill="#4A6FE8" />
      <circle cx="250" cy="78" r="22" fill="#FBFCFF" />
      {/* bar chart card */}
      <rect x="206" y="150" width="126" height="78" rx="12" fill="#FFFFFF" stroke="#E2E6EE" />
      <rect x="222" y="194" width="14" height="20" rx="3" fill="#4A6FE8" />
      <rect x="244" y="180" width="14" height="34" rx="3" fill="#FD6621" />
      <rect x="266" y="170" width="14" height="44" rx="3" fill="#4A6FE8" />
      <rect x="288" y="186" width="14" height="28" rx="3" fill="#FD6621" />
      <rect x="310" y="176" width="14" height="38" rx="3" fill="#4A6FE8" />
    </svg>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return AFFILIATES;
    return AFFILIATES.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.postalCode.includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-[1180px] mx-auto px-8 py-12">
        {/* Hero */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary uppercase">
              {NETWORK.name}
            </h1>
            <p className="t-body-md text-ink-secondary mt-3">
              Aujourd&apos;hui dans votre réseau{" "}
              <span className="font-extrabold text-accent-orange">leboncoin</span>
              <span className="font-bold text-ink"> auto</span>
            </p>
            <p className="mt-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-ink tabular-nums">
                {TOTAL_ADS.toLocaleString("fr-FR")}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-ink"> annonces en ligne</span>
            </p>

            <Link
              href="/reseau"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3.5 t-label-md font-semibold text-white bg-primary rounded-full hover:bg-primary-strong transition-colors shadow-card"
            >
              Accéder aux performances globales {NETWORK.name}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="w-full md:w-[340px] flex-shrink-0">
            <HeroIllustration />
          </div>
        </header>

        {/* Establishments card */}
        <section className="bg-surface rounded-card shadow-card p-6 sm:p-8">
          <h2 className="t-headline-md mb-5">
            Vos performances par établissement ({AFFILIATES.length})
          </h2>

          <div className="relative mb-5">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 t-body-md text-ink border border-border-input rounded-field focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-ink-muted"
            />
          </div>

          {/* List header */}
          <div className="px-4 py-2.5 rounded-field bg-app mb-1">
            <span className="t-caption font-semibold uppercase tracking-wider text-ink-secondary">
              Nom de l&apos;établissement
            </span>
          </div>

          <ul>
            {filtered.map((a) => (
              <li key={a.id} className="border-b border-border-base last:border-0">
                <Link
                  href={`/filiale/${a.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-4 -mx-1 rounded-field hover:bg-app transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="t-headline-sm truncate">{a.name}</p>
                    <p className="t-caption text-ink-muted mt-0.5">
                      {a.city} ({a.postalCode})
                    </p>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-ink-muted group-hover:text-primary transition-colors flex-shrink-0"
                  />
                </Link>
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="py-10 text-center t-body-md text-ink-muted">
                Aucun établissement pour « {search} »
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
