"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, Download, Calendar, ChevronDown, Plus, Search, Car, Eye, Sparkles, MapPin,
  RefreshCw, Image as ImageIcon, Tag, Zap, Rocket, ArrowRight, ArrowUp, ArrowDown,
} from "lucide-react";
import { AFFILIATES, Affiliate, statusOf } from "@/data/affiliates";
import { affiliateScoreCards } from "@/data/dashboardData";
import { getFilialeAnnonces, ANNONCE_STATUS_META, AnnonceStatus, Annonce } from "@/data/annonces";
import ScoreCards from "./ScoreCards";
import AssistantBar from "./AssistantBar";
import { TONE, scoreTone, StatusToneCls } from "./ui";

const fmtEur = (n: number) => `${n.toLocaleString("fr-FR")} €`;
const fmtKm = (n: number) => `${n.toLocaleString("fr-FR")} km`;

function ScoreTag({ label, value }: { label: string; value: number }) {
  const t = TONE[scoreTone(value)];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 t-caption font-semibold ${t.soft} ${t.text}`}>
      {label} {value}
    </span>
  );
}

// ── Radar 4 axes ─────────────────────────────────────────────────────────────
function Radar({ a }: { a: Affiliate }) {
  const C = 80, R = 60;
  const pt = (v: number, axis: number) => {
    const r = (Math.max(0, Math.min(100, v)) / 100) * R;
    return axis === 0 ? [C, C - r] : axis === 1 ? [C + r, C] : axis === 2 ? [C, C + r] : [C - r, C];
  };
  const ring = (f: number) => [pt(100 * f, 0), pt(100 * f, 1), pt(100 * f, 2), pt(100 * f, 3)].map((p) => p.join(",")).join(" ");
  const data = [pt(a.roi, 0), pt(a.prix, 1), pt(a.reactivite, 2), pt(a.qualite, 3)].map((p) => p.join(",")).join(" ");
  return (
    <svg viewBox="0 0 160 160" className="w-[150px] h-[150px]">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="#E2E6EE" strokeWidth="1" />
      ))}
      <line x1={C} y1={C - R} x2={C} y2={C + R} stroke="#E2E6EE" />
      <line x1={C - R} y1={C} x2={C + R} y2={C} stroke="#E2E6EE" />
      <polygon points={data} fill="#4A6FE8" fillOpacity="0.22" stroke="#4A6FE8" strokeWidth="2" />
    </svg>
  );
}

// ── Synthèse performance (radar + comparaison réseau) ────────────────────────
function PerformanceCard({ a }: { a: Affiliate }) {
  const avg = useMemo(() => {
    const n = AFFILIATES.length;
    return {
      roi: Math.round(AFFILIATES.reduce((s, x) => s + x.roi, 0) / n),
      leadCost: AFFILIATES.reduce((s, x) => s + x.leadCost, 0) / n,
      leads: Math.round(AFFILIATES.reduce((s, x) => s + x.leads, 0) / n),
    };
  }, []);

  const cmp = [
    { label: "ROI", you: `${a.roi}`, delta: a.roi - avg.roi, fmt: (d: number) => `${d > 0 ? "+" : ""}${d} pts`, better: a.roi >= avg.roi },
    { label: "Coût / lead", you: `${a.leadCost.toFixed(2).replace(".", ",")} €`, delta: +(a.leadCost - avg.leadCost).toFixed(2), fmt: (d: number) => `${d > 0 ? "+" : ""}${d.toFixed(2).replace(".", ",")} €`, better: a.leadCost <= avg.leadCost },
    { label: "Leads / sem.", you: `${a.leads}`, delta: a.leads - avg.leads, fmt: (d: number) => `${d > 0 ? "+" : ""}${d}`, better: a.leads >= avg.leads },
  ];

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <h2 className="t-headline-md">Synthèse performance</h2>
      <p className="t-caption text-ink-muted mt-0.5 mb-4">Profil de la filiale · comparé à la moyenne réseau</p>

      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center flex-shrink-0">
          <Radar a={a} />
          <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 mt-1 max-w-[160px]">
            {[["ROI", "bg-primary"], ["Prix", "bg-potential-high"], ["Réact.", "bg-potential-mid"], ["Qualité", "bg-potential-low"]].map(
              ([l, c]) => (
                <span key={l} className="inline-flex items-center gap-1 t-caption text-ink-secondary">
                  <span className={`w-1.5 h-1.5 rounded-full ${c}`} /> {l}
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2.5">
          {cmp.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-3 rounded-field border border-border-base px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="t-caption text-ink-muted">{c.label}</p>
                <p className="t-headline-sm">{c.you}</p>
              </div>
              <span className={`inline-flex items-center gap-1 t-caption font-bold whitespace-nowrap ${c.better ? "text-potential-high" : "text-alert"}`}>
                {c.delta === 0 ? null : c.better ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {c.fmt(c.delta)}
                <span className="t-caption font-normal text-ink-muted ml-0.5">vs rés.</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Actions recommandées (raccourcis IA orientés action) ──────────────────────
interface ActionItem {
  tone: "blue" | "green" | "amber" | "red";
  icon: typeof RefreshCw;
  title: string;
  impact: string;
  cta: string;
}

function buildActions(a: Affiliate, annonces: Annonce[]): ActionItem[] {
  const expiring = annonces.filter((x) => x.status === "expiring").length;
  const lowQ = annonces.filter((x) => x.qualite < 55).length;
  const overpriced = annonces.filter((x) => x.prix < 55).length;
  const list: ActionItem[] = [];

  if (expiring > 0)
    list.push({ tone: "amber", icon: RefreshCw, title: `Republier ${expiring} annonce${expiring > 1 ? "s" : ""} en fin de visibilité`, impact: `Relance l'exposition · +${expiring * 4} vues estimées`, cta: "Republier" });
  if (lowQ > 0)
    list.push({ tone: "blue", icon: ImageIcon, title: `Compléter ${lowQ} annonce${lowQ > 1 ? "s" : ""} incomplète${lowQ > 1 ? "s" : ""}`, impact: "Photos + options : jusqu'à 3× plus de leads", cta: "Compléter" });
  if (overpriced > 0)
    list.push({ tone: "red", icon: Tag, title: `Réviser le prix de ${overpriced} annonce${overpriced > 1 ? "s" : ""} au-dessus de la ZDC`, impact: `Aligner sur le marché local · +${overpriced * 2} leads estimés`, cta: "Ajuster les prix" });
  if (a.reactivite < 65)
    list.push({ tone: "green", icon: Zap, title: "Activer les réponses automatiques week-end", impact: "Réduit le délai de réponse aux leads froids", cta: "Activer" });
  if (list.length < 3)
    list.push({ tone: "blue", icon: Rocket, title: "Booster les annonces les plus vues", impact: "Mise en avant réseau · gain de visibilité immédiat", cta: "Booster" });

  return list.slice(0, 4);
}

function ActionsCard({ a, annonces }: { a: Affiliate; annonces: Annonce[] }) {
  const actions = useMemo(() => buildActions(a, annonces), [a, annonces]);
  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="t-headline-md">Actions recommandées</h2>
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 t-caption font-bold">
          <Sparkles size={11} /> IA
        </span>
      </div>
      <p className="t-caption text-ink-muted mb-3">Raccourcis vers les optimisations à plus fort impact</p>

      <ul className="flex flex-col">
        {actions.map((act, i) => {
          const Icon = act.icon;
          const t = TONE[act.tone];
          return (
            <li key={i} className="flex items-center gap-3 py-3 border-b border-border-base last:border-0">
              <span className={`w-9 h-9 rounded-thumb flex items-center justify-center flex-shrink-0 ${t.soft}`}>
                <Icon size={16} className={t.text} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="t-label-md font-semibold text-ink leading-snug">{act.title}</p>
                <p className="t-caption text-ink-muted mt-0.5">{act.impact}</p>
              </div>
              <button className="inline-flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-full t-caption font-semibold text-primary bg-primary/10 hover:bg-primary/15 transition-colors">
                {act.cta} <ArrowRight size={13} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ── Annonces en ligne (focus) ─────────────────────────────────────────────────
const STATUS_TABS: { key: AnnonceStatus | "all"; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "active", label: "En ligne" },
  { key: "boost", label: "En avant" },
  { key: "expiring", label: "Expirent" },
];

function AnnoncesCard({ annonces }: { annonces: Annonce[] }) {
  const [tab, setTab] = useState<AnnonceStatus | "all">("all");
  const [search, setSearch] = useState("");

  const rows = annonces.filter(
    (an) =>
      (tab === "all" || an.status === tab) &&
      (!search.trim() || an.model.toLowerCase().includes(search.trim().toLowerCase()))
  );

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h2 className="t-headline-md">Annonces en ligne</h2>
          <p className="t-caption text-ink-muted mt-0.5">
            {annonces.length} annonces publiées · performances individuelles
          </p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un modèle…"
            className="w-52 pl-9 pr-3 py-2 t-label-md text-ink bg-surface border border-border-input rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-ink-muted"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3.5 py-1.5 rounded-full t-label-md font-semibold transition-colors ${
              tab === t.key ? "bg-primary text-white" : "bg-app text-ink-secondary hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul>
        {rows.map((an) => {
          const st = ANNONCE_STATUS_META[an.status];
          return (
            <li key={an.id} className="flex items-center justify-between gap-4 py-3 border-b border-border-base last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-11 h-11 rounded-thumb flex items-center justify-center flex-shrink-0 ${TONE[scoreTone(an.leadsScore)].soft}`}>
                  <Car size={20} className={TONE[scoreTone(an.leadsScore)].text} />
                </span>
                <div className="min-w-0">
                  <p className="t-headline-sm truncate">
                    {an.model} — {an.year} · {fmtKm(an.km)}
                  </p>
                  <p className="t-caption text-ink-muted mt-0.5 truncate">
                    {fmtEur(an.price)} · {an.views} vues · {an.leads} lead{an.leads > 1 ? "s" : ""} · en ligne {an.daysOnline}j
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`hidden md:inline-flex t-caption font-bold rounded-full px-2.5 py-1 ${StatusToneCls[st.tone]}`}>{st.label}</span>
                <ScoreTag label="Prix" value={an.prix} />
                <ScoreTag label="Leads" value={an.leadsScore} />
                <ScoreTag label="Qualité" value={an.qualite} />
                <button className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full t-caption font-semibold text-primary hover:bg-primary/10 transition-colors">
                  <Eye size={14} /> Voir
                </button>
              </div>
            </li>
          );
        })}
        {rows.length === 0 && (
          <li className="py-8 text-center t-body-md text-ink-muted">Aucune annonce ne correspond.</li>
        )}
      </ul>
    </section>
  );
}

export default function FilialeDashboard({ affiliate }: { affiliate: Affiliate }) {
  const a = affiliate;
  const status = statusOf(a);
  const annonces = useMemo(() => getFilialeAnnonces(a), [a]);

  return (
    <div className="p-8 max-w-[1320px]">
      <Link href="/top-flop" className="inline-flex items-center gap-1.5 t-label-md font-semibold text-ink-secondary hover:text-primary transition-colors mb-4">
        <ArrowLeft size={15} /> Liste de mes filiales
      </Link>

      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="t-headline-lg">{a.name}</h1>
            <span className={`t-caption font-bold rounded-full px-2.5 py-1 ${StatusToneCls[status.tone]}`}>{status.label}</span>
          </div>
          <p className="t-body-md text-ink-secondary mt-1 flex items-center gap-1.5">
            <MapPin size={14} className="text-ink-muted" />
            {a.city} ({a.postalCode}) · {a.region} · <strong className="text-ink font-semibold">{a.adsCount} annonces en ligne</strong>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="inline-flex items-center gap-2 bg-surface border border-border-input rounded-full px-4 py-2.5 t-label-md font-medium text-ink hover:border-ink-muted transition-colors">
            <Download size={15} /> Exporter
          </button>
          <button className="inline-flex items-center gap-2 bg-surface border border-border-input rounded-full px-4 py-2.5 t-label-md font-medium text-ink hover:border-ink-muted transition-colors">
            <Calendar size={15} /> Cette semaine <ChevronDown size={14} className="text-ink-muted" />
          </button>
          <button className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2.5 t-label-md font-semibold hover:bg-primary-strong transition-colors shadow-card">
            <Plus size={16} /> Nouvelle annonce
          </button>
        </div>
      </header>

      {/* Assistant IA */}
      <div className="mb-6">
        <AssistantBar />
      </div>

      {/* KPIs filiale */}
      <div className="mb-6">
        <ScoreCards scores={affiliateScoreCards(a)} />
      </div>

      {/* Synthèse + Actions (remontés sous les indicateurs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceCard a={a} />
        <ActionsCard a={a} annonces={annonces} />
      </div>

      {/* Focus : annonces en ligne */}
      <AnnoncesCard annonces={annonces} />
    </div>
  );
}
