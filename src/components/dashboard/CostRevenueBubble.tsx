"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceLine, Cell, ResponsiveContainer,
} from "recharts";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { AFFILIATES, Affiliate } from "@/data/affiliates";

const ROI_HEX = (roi: number) => (roi >= 75 ? "#1DAA6E" : roi >= 50 ? "#F4A623" : "#E0354B");
const MEDIAN_X = 4.0;
const MEDIAN_Y = 5000;

type Preset = "all" | "top" | "flop" | null;

interface Point {
  id: string; name: string; city: string;
  x: number; y: number; z: number; roi: number; leads: number;
}

const toPoint = (a: Affiliate): Point => ({
  id: a.id, name: a.name, city: a.city, x: a.leadCost, y: a.revenue, z: a.adsCount, roi: a.roi, leads: a.leads,
});

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: Point }[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-ink text-white rounded-field px-3.5 py-3 shadow-lg min-w-[180px]">
      <p className="t-label-md font-bold mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: ROI_HEX(p.roi) }} />
        {p.name}
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        <span className="t-caption text-white/55">Coût / lead</span>
        <span className="t-caption font-semibold text-right tabular-nums">{p.x.toFixed(2).replace(".", ",")} €</span>
        <span className="t-caption text-white/55">Revenu LBC</span>
        <span className="t-caption font-semibold text-right tabular-nums">{p.y.toLocaleString("fr-FR")} €</span>
        <span className="t-caption text-white/55">Annonces</span>
        <span className="t-caption font-semibold text-right tabular-nums">{p.z}</span>
        <span className="t-caption text-white/55">ROI</span>
        <span className="t-caption font-semibold text-right tabular-nums">{p.roi}/100</span>
      </div>
    </div>
  );
}

const LEGEND = [
  { c: "#1DAA6E", label: "ROI élevé ≥ 75" },
  { c: "#F4A623", label: "ROI moyen 50–74" },
  { c: "#E0354B", label: "ROI faible < 50" },
];

const QUADRANTS = [
  { pos: "left-[60px] top-1 text-left", tag: "Stars", desc: "coût faible · revenu fort" },
  { pos: "right-1 top-1 text-right items-end", tag: "À optimiser", desc: "coût fort · revenu fort" },
  { pos: "left-[60px] bottom-9 text-left", tag: "Potentiel", desc: "coût faible · revenu faible" },
  { pos: "right-1 bottom-9 text-right items-end", tag: "À redresser", desc: "coût fort · revenu faible" },
];

const PRESETS: { key: Exclude<Preset, null>; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "top", label: "Top 5" },
  { key: "flop", label: "Flop 5" },
];

export default function CostRevenueBubble() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(AFFILIATES.map((a) => a.id)));
  const [preset, setPreset] = useState<Preset>("all");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const top5 = useMemo(() => new Set([...AFFILIATES].sort((a, b) => b.roi - a.roi).slice(0, 5).map((a) => a.id)), []);
  const flop5 = useMemo(() => new Set([...AFFILIATES].sort((a, b) => a.roi - b.roi).slice(0, 5).map((a) => a.id)), []);

  function applyPreset(key: Exclude<Preset, null>) {
    setPreset(key);
    setSelected(new Set(key === "all" ? AFFILIATES.map((a) => a.id) : key === "top" ? top5 : flop5));
  }

  function toggleOne(id: string) {
    setPreset(null);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const points = useMemo(() => AFFILIATES.filter((a) => selected.has(a.id)).map(toPoint), [selected]);
  const filteredList = AFFILIATES.filter((a) => a.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2 className="t-headline-md">Cartographie coût / revenu</h2>
          <p className="t-caption text-ink-muted mt-0.5">
            Taille de bulle = annonces actives · semaine du 16–22 juin
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Segmented control */}
          <div className="inline-flex bg-app rounded-full p-1">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => applyPreset(p.key)}
                className={`px-3.5 py-1.5 rounded-full t-label-md font-semibold transition-colors ${
                  preset === p.key ? "bg-surface text-primary shadow-card" : "text-ink-secondary hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Multi-select */}
          <div className="relative" ref={wrapRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full t-label-md font-semibold border transition-colors ${
                preset === null ? "bg-primary/10 border-primary text-primary" : "bg-surface border-border-input text-ink-secondary hover:border-primary hover:text-primary"
              }`}
            >
              <SlidersHorizontal size={14} /> Filiales
              {preset === null && (
                <span className="bg-primary text-white t-caption font-bold rounded-full px-1.5 leading-none tabular-nums">{selected.size}</span>
              )}
              <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-surface border border-border-base rounded-card shadow-lg overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-base">
                  <Search size={14} className="text-ink-muted flex-shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une filiale…"
                    className="flex-1 min-w-0 bg-transparent t-caption text-ink focus:outline-none placeholder-ink-muted"
                  />
                </div>
                <div className="flex gap-3 px-3.5 py-2 border-b border-border-base">
                  <button onClick={() => { setPreset(null); setSelected(new Set(AFFILIATES.map((a) => a.id))); }} className="t-caption font-semibold text-primary hover:underline">Tout sélectionner</button>
                  <button onClick={() => { setPreset(null); setSelected(new Set()); }} className="t-caption font-semibold text-ink-muted hover:underline">Effacer</button>
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {filteredList.map((a) => {
                    const on = selected.has(a.id);
                    return (
                      <button
                        key={a.id}
                        onClick={() => toggleOne(a.id)}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-app transition-colors text-left"
                      >
                        <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${on ? "bg-primary border-primary" : "border-border-input"}`}>
                          {on && <Check size={11} className="text-white" strokeWidth={3} />}
                        </span>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ROI_HEX(a.roi) }} />
                        <span className="t-caption font-medium text-ink truncate">{a.name}</span>
                      </button>
                    );
                  })}
                  {filteredList.length === 0 && (
                    <p className="px-3.5 py-3 t-caption text-ink-muted text-center">Aucune filiale trouvée</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-2">
        {LEGEND.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-1.5 t-caption font-medium text-ink-secondary">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} /> {l.label}
          </span>
        ))}
        <span className="inline-flex items-end gap-1.5 t-caption text-ink-muted ml-auto">
          <span className="w-2 h-2 rounded-full bg-ink-muted/30 ring-1 ring-ink-muted/40" />
          <span className="w-3.5 h-3.5 rounded-full bg-ink-muted/30 ring-1 ring-ink-muted/40" />
          <span className="ml-0.5">+ d&apos;annonces</span>
        </span>
      </div>

      {/* Chart */}
      <div className="relative rounded-card bg-app/40 border border-border-base/70 pt-2" style={{ height: 360 }}>
        {/* Quadrant labels */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {QUADRANTS.map((q) => (
            <div key={q.tag} className={`absolute flex flex-col ${q.pos}`}>
              <span className="t-caption font-bold uppercase tracking-wide text-ink-muted/55 leading-tight">{q.tag}</span>
              <span className="text-[10px] text-ink-muted/40 leading-tight">{q.desc}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 28, right: 16, bottom: 6, left: 4 }}>
            <CartesianGrid stroke="#E2E6EE" strokeDasharray="0" vertical />
            <XAxis
              type="number" dataKey="x" domain={[1, 7.5]}
              tickFormatter={(v) => `${v.toFixed(1)}€`}
              tick={{ fontSize: 11, fill: "#8A91A8" }} tickLine={false} axisLine={{ stroke: "#D5DAE5" }} tickMargin={6}
            />
            <YAxis
              type="number" dataKey="y" domain={[0, 10000]}
              tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k€` : `${v}€`)}
              tick={{ fontSize: 11, fill: "#8A91A8" }} tickLine={false} axisLine={{ stroke: "#D5DAE5" }} width={42}
            />
            <ZAxis type="number" dataKey="z" range={[140, 1100]} />
            <ReferenceLine x={MEDIAN_X} stroke="#C4C5D6" strokeDasharray="6 5" />
            <ReferenceLine y={MEDIAN_Y} stroke="#C4C5D6" strokeDasharray="6 5" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#C4C5D6" }} />
            <Scatter data={points} fillOpacity={0.68} isAnimationActive>
              {points.map((p) => (
                <Cell key={p.id} fill={ROI_HEX(p.roi)} stroke={ROI_HEX(p.roi)} strokeWidth={1.5} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="t-caption text-ink-muted">← moins cher</span>
        <span className="t-caption text-ink-muted font-medium">Coût par lead moyen (€)</span>
        <span className="t-caption text-ink-muted">plus cher →</span>
      </div>
    </section>
  );
}
