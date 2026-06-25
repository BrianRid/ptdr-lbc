"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download, Calendar, ChevronDown, Plus, Search, Medal, ChevronRight,
  ArrowUp, ArrowDown, Minus, MapPin, Sparkles,
} from "lucide-react";
import {
  AFFILIATES, Affiliate, affiliateRegions, statusOf, cplScore, StatusTone,
} from "@/data/affiliates";
import { TONE, InfoHint, scoreTone, leadCostTone } from "./ui";

const STATUS_CLS: Record<StatusTone, string> = {
  green: "text-potential-high bg-potential-high/15",
  amber: "text-potential-mid bg-potential-mid/15",
  red: "text-alert bg-alert/10",
};

const fmtCost = (v: number) => `${v.toFixed(2).replace(".", ",")} €`;

function StatusBadge({ a }: { a: Affiliate }) {
  const s = statusOf(a);
  return <span className={`t-caption font-bold rounded-full px-2.5 py-1 whitespace-nowrap ${STATUS_CLS[s.tone]}`}>{s.label}</span>;
}

function ScoreChip({ value }: { value: number }) {
  const tone = TONE[scoreTone(value)];
  return (
    <span className={`inline-flex items-center justify-center min-w-[2.5rem] rounded-full px-2 py-1 t-label-md font-bold tabular-nums ${tone.soft} ${tone.text}`}>
      {value}
    </span>
  );
}

function WowCell({ v }: { v: number }) {
  if (v === 0) return <span className="inline-flex items-center gap-0.5 t-label-md font-semibold text-ink-muted"><Minus size={13} /></span>;
  const up = v > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 t-label-md font-semibold ${up ? "text-potential-high" : "text-alert"}`}>
      {up ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
      {Math.abs(v)}
    </span>
  );
}

// ── Radar 4 axes (ROI / Prix / Réactivité / Qualité) ─────────────────────────
function Radar({ a }: { a: Affiliate }) {
  const C = 90, R = 70;
  const pt = (v: number, axis: 0 | 1 | 2 | 3) => {
    const r = (Math.max(0, Math.min(100, v)) / 100) * R;
    if (axis === 0) return [C, C - r];
    if (axis === 1) return [C + r, C];
    if (axis === 2) return [C, C + r];
    return [C - r, C];
  };
  const vertices = (f: number) =>
    [pt(100 * f, 0), pt(100 * f, 1), pt(100 * f, 2), pt(100 * f, 3)]
      .map((p) => p.join(",")).join(" ");
  const data = [pt(a.roi, 0), pt(a.prix, 1), pt(a.reactivite, 2), pt(a.qualite, 3)]
    .map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox="0 0 180 180" className="w-[180px] h-[180px]">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={vertices(f)} fill="none" stroke="#E2E6EE" strokeWidth="1" />
      ))}
      <line x1={C} y1={C - R} x2={C} y2={C + R} stroke="#E2E6EE" />
      <line x1={C - R} y1={C} x2={C + R} y2={C} stroke="#E2E6EE" />
      <polygon points={data} fill="#4A6FE8" fillOpacity="0.25" stroke="#4A6FE8" strokeWidth="2" />
    </svg>
  );
}

function recommendation(a: Affiliate): string {
  const dims = [
    { k: "le délai de réponse aux leads", v: a.reactivite },
    { k: "la complétude des annonces", v: a.qualite },
    { k: "le positionnement prix", v: a.prix },
  ].sort((x, y) => x.v - y.v);
  const tier = a.roi >= 80 ? "Performance solide." : a.roi >= 50 ? "Performance correcte." : "Performance en retrait.";
  return `${tier} Pour progresser, travailler ${dims[0].k} et ${dims[1].k}.`;
}

const KPI_ROWS: { label: string; get: (a: Affiliate) => number; bar: string }[] = [
  { label: "ROI global", get: (a) => a.roi, bar: "bg-primary" },
  { label: "Prix / ZDC", get: (a) => a.prix, bar: "bg-potential-high" },
  { label: "Réactivité", get: (a) => a.reactivite, bar: "bg-potential-mid" },
  { label: "Qualité", get: (a) => a.qualite, bar: "bg-potential-low" },
  { label: "CPL (inversé)", get: (a) => cplScore(a.leadCost), bar: "bg-pink" },
];

function RowDetail({ a }: { a: Affiliate }) {
  return (
    <div className="bg-app rounded-card p-5 m-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* KPIs */}
      <div>
        <p className="t-caption font-bold uppercase tracking-wider text-ink-muted mb-3">Détail des 5 KPIs</p>
        <div className="flex flex-col gap-2.5">
          {KPI_ROWS.map((row) => {
            const v = row.get(a);
            return (
              <div key={row.label} className="flex items-center gap-3">
                <span className="t-caption text-ink-secondary w-24 flex-shrink-0">{row.label}</span>
                <span className="flex-1 h-2 rounded-full bg-border-base/60 overflow-hidden">
                  <span className={`block h-full rounded-full ${row.bar}`} style={{ width: `${v}%` }} />
                </span>
                <span className="t-label-md font-bold text-ink tabular-nums w-7 text-right">{v}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Radar */}
      <div className="flex flex-col items-center">
        <p className="t-caption font-bold uppercase tracking-wider text-ink-muted mb-1 self-start">Radar performance</p>
        <Radar a={a} />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
          {[["ROI", "bg-primary"], ["Prix", "bg-potential-high"], ["Réact.", "bg-potential-mid"], ["Qualité", "bg-potential-low"]].map(
            ([l, c]) => (
              <span key={l} className="inline-flex items-center gap-1 t-caption text-ink-secondary">
                <span className={`w-2 h-2 rounded-full ${c}`} /> {l}
              </span>
            )
          )}
        </div>
      </div>

      {/* Reco IA */}
      <div>
        <p className="t-caption font-bold uppercase tracking-wider text-ink-muted mb-3">Recommandation IA</p>
        <div className="bg-potential-mid/10 border border-potential-mid/30 rounded-field p-3.5 mb-3">
          <p className="t-body-md text-ink flex gap-2">
            <Sparkles size={15} className="text-potential-mid flex-shrink-0 mt-0.5" />
            <span>{recommendation(a)}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/filiale/${a.id}`}
            className="inline-flex items-center px-4 py-2 t-label-md font-semibold text-white bg-primary rounded-full hover:bg-primary-strong transition-colors"
          >
            Voir les annonces
          </Link>
          <button className="inline-flex items-center px-4 py-2 t-label-md font-semibold text-ink bg-surface border border-border-input rounded-full hover:border-ink-muted transition-colors">
            Contacter la filiale
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Cartes Top 3 / Flop 3 ─────────────────────────────────────────────────────
const MEDAL_COLORS = ["text-[#E0A100]", "text-potential-low", "text-[#C2772E]"];

function weakestDim(a: Affiliate): string {
  const dims = [
    { label: "Réactivité", v: a.reactivite },
    { label: "Qualité", v: a.qualite },
    { label: "Prix", v: a.prix },
  ].sort((x, y) => x.v - y.v);
  return `${dims[0].label} ${dims[0].v}`;
}

function HighlightCard({ variant, items }: { variant: "top" | "flop"; items: Affiliate[] }) {
  const isTop = variant === "top";
  return (
    <section className={`bg-surface rounded-card shadow-card overflow-hidden border-t-[3px] ${isTop ? "border-potential-high" : "border-alert"}`}>
      <div className="p-6">
        <h2 className="t-headline-md flex items-center gap-2">
          {isTop ? "🏆" : "📉"} {isTop ? "Top 3 filiales" : "Flop 3 filiales"}
        </h2>
        <p className="t-caption text-ink-muted mb-4">
          {isTop ? "Meilleures performances ROI cette semaine" : "Performances à améliorer en priorité"}
        </p>
        <ul className="flex flex-col gap-1">
          {items.map((a, i) => (
            <li key={a.id} className="flex items-center justify-between gap-4 py-2.5 border-b border-border-base last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                {isTop ? (
                  <Medal size={20} className={`flex-shrink-0 ${MEDAL_COLORS[i]}`} />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-alert/10 text-alert t-caption font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="t-headline-sm truncate">{a.name}</p>
                  <p className="t-caption text-ink-muted truncate">
                    ROI {a.roi} · {a.leads} leads · CPL {fmtCost(a.leadCost)} · {isTop ? `Qualité ${a.qualite}` : weakestDim(a)}
                  </p>
                </div>
              </div>
              <StatusBadge a={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const COL_HINTS: { label: string; hint: string }[] = [
  { label: "ROI global", hint: "Valeur générée rapportée au coût média de la filiale." },
  { label: "Prix / ZDC", hint: "Alignement des prix sur la zone de chalandise locale." },
  { label: "Réactivité", hint: "Rapidité de traitement des leads entrants." },
  { label: "Qualité", hint: "Complétude et attractivité des annonces." },
  { label: "CPL", hint: "Coût d'acquisition moyen d'un lead. Plus c'est bas, mieux c'est." },
];

export default function TopFlopTable() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [openId, setOpenId] = useState<string | null>(AFFILIATES[0]?.id ?? null);

  const byRoi = useMemo(() => [...AFFILIATES].sort((a, b) => b.roi - a.roi), []);
  const top3 = byRoi.slice(0, 3);
  const flop3 = byRoi.slice(-3).reverse();

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return byRoi.filter(
      (a) =>
        (region === "all" || a.region === region) &&
        (!q || a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q))
    );
  }, [byRoi, search, region]);

  return (
    <div className="p-8 max-w-[1320px]">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="t-headline-lg">Top / Flop filiales</h1>
          <p className="t-body-md text-ink-secondary mt-1">
            Vue détaillée de toutes les filiales · Semaine du 16 au 22 juin 2026
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
            <Plus size={16} /> Ajouter une filiale
          </button>
        </div>
      </header>

      {/* Top 3 / Flop 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <HighlightCard variant="top" items={top3} />
        <HighlightCard variant="flop" items={flop3} />
      </div>

      {/* Toutes les filiales */}
      <section className="bg-surface rounded-card shadow-card p-6">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <h2 className="t-headline-md">Toutes les filiales</h2>
            <p className="t-caption text-ink-muted mt-0.5">
              Cliquer sur une ligne pour voir le détail · {rows.length} filiales
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher"
                className="w-44 pl-9 pr-3 py-2 t-label-md text-ink bg-surface border border-border-input rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-ink-muted"
              />
            </div>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="appearance-none bg-surface border border-border-input rounded-full pl-3.5 pr-8 py-2 t-label-md font-medium text-ink cursor-pointer hover:border-ink-muted transition-colors focus:outline-none"
              >
                <option value="all">Filtre région</option>
                {affiliateRegions().map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-base">
                <th className="px-3 py-3 text-left">
                  <span className="t-caption font-semibold uppercase tracking-wider text-ink-secondary">Filiale</span>
                </th>
                {COL_HINTS.map((c) => (
                  <th key={c.label} className="px-3 py-3 text-center">
                    <span className="inline-flex items-center gap-1 t-caption font-semibold uppercase tracking-wider text-ink-secondary">
                      {c.label} <InfoHint text={c.hint} />
                    </span>
                  </th>
                ))}
                <th className="px-3 py-3 text-center"><span className="t-caption font-semibold uppercase tracking-wider text-ink-secondary">Leads</span></th>
                <th className="px-3 py-3 text-center"><span className="t-caption font-semibold uppercase tracking-wider text-ink-secondary">Évol. WoW</span></th>
                <th className="px-3 py-3 text-center"><span className="t-caption font-semibold uppercase tracking-wider text-ink-secondary">Statut</span></th>
                <th className="px-3 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const open = openId === a.id;
                return (
                  <FragmentRow key={a.id} a={a} open={open} onToggle={() => setOpenId(open ? null : a.id)} />
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-10 text-center t-body-md text-ink-muted">Aucune filiale ne correspond.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function FragmentRow({ a, open, onToggle }: { a: Affiliate; open: boolean; onToggle: () => void }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-border-base cursor-pointer transition-colors ${open ? "bg-app/60" : "hover:bg-app/50"}`}
      >
        <td className="px-3 py-3">
          <span className="block t-label-md font-semibold text-ink">{a.name}</span>
          <span className="t-caption text-ink-muted flex items-center gap-1">
            <MapPin size={10} /> {a.city} · {a.adsCount} annonces
          </span>
        </td>
        <td className="px-3 py-3 text-center"><ScoreChip value={a.roi} /></td>
        <td className="px-3 py-3 text-center"><ScoreChip value={a.prix} /></td>
        <td className="px-3 py-3 text-center"><ScoreChip value={a.reactivite} /></td>
        <td className="px-3 py-3 text-center"><ScoreChip value={a.qualite} /></td>
        <td className={`px-3 py-3 text-center t-label-md font-bold tabular-nums ${TONE[leadCostTone(a.leadCost)].text}`}>{fmtCost(a.leadCost)}</td>
        <td className="px-3 py-3 text-center t-label-md font-semibold text-ink tabular-nums">{a.leads}</td>
        <td className="px-3 py-3 text-center"><WowCell v={a.wow} /></td>
        <td className="px-3 py-3 text-center"><StatusBadge a={a} /></td>
        <td className="px-3 py-3 text-center">
          <ChevronRight size={16} className={`text-ink-muted transition-transform ${open ? "rotate-90" : ""}`} />
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={10} className="p-0">
            <RowDetail a={a} />
          </td>
        </tr>
      )}
    </>
  );
}
