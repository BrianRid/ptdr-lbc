import { AffiliateMetric, Affiliate } from "./affiliates";

export type Tone = "blue" | "green" | "amber" | "gray" | "red";
export type TrendDir = "up" | "down" | "flat";

export interface ScoreCard {
  key: string;
  label: string;
  definition: string; // infobulle
  trend: string;
  trendDir: TrendDir;
  tone: Tone;
  kind: "score" | "cost";
  score?: number; // kind = "score" → /100
  display?: string; // kind = "cost" → "3,20 €"
  footnote?: string; // kind = "cost"
}

export interface MarketMetric {
  key: string;
  label: string;
  trendLabel: string;
  trendDir: TrendDir;
  barTone: Tone;
  barPct: number;
  detail: string;
}

export interface TrendingModel {
  name: string;
  pct: string;
}

export interface DashboardData {
  scores: ScoreCard[];
  banner: string; // supporte **gras**
  bannerRegion: string;
  market: MarketMetric[];
  trendingModels: TrendingModel[];
}

// ── Tête de réseau (valeurs du design de référence) ──────────────────────────
export const NETWORK_DASHBOARD: DashboardData = {
  scores: [
    {
      key: "roi", label: "ROI global réseau", kind: "score", score: 74, trend: "+4 pts", trendDir: "up", tone: "blue",
      definition: "Retour sur investissement consolidé : valeur générée (leads, ventes) rapportée au coût des annonces et options, sur l'ensemble des filiales.",
    },
    {
      key: "prix", label: "Positionnement prix / ZDC", kind: "score", score: 81, trend: "+7 pts", trendDir: "up", tone: "green",
      definition: "Compétitivité de vos prix vs la Zone De Chalandise. 100 = parfaitement aligné sur les prix pratiqués localement pour des véhicules comparables.",
    },
    {
      key: "reactivite", label: "Réactivité leads", kind: "score", score: 62, trend: "-2 pts", trendDir: "down", tone: "amber",
      definition: "Vitesse moyenne de prise en charge des leads par les filiales. Plus le score est haut, plus les contacts entrants sont traités rapidement.",
    },
    {
      key: "qualite", label: "Qualité des annonces", kind: "score", score: 68, trend: "stable", trendDir: "flat", tone: "gray",
      definition: "Complétude et attractivité des annonces : photos, description, options renseignées et conformité au référentiel du réseau.",
    },
    {
      key: "cpl", label: "Coût par lead moyen", kind: "cost", display: "3,20 €", trend: "+0,40 €", trendDir: "up", tone: "red",
      footnote: "Meilleur : **1,80 €** Paris 15 · Pire : **6,40 €** Marseille",
      definition: "Dépense média moyenne nécessaire pour générer un lead sur le réseau. Plus le montant est bas, plus l'acquisition est efficace.",
    },
  ],
  banner: "Votre réseau performe **+11%** vs la concurrence sur le ratio leads/annonce",
  bannerRegion: "Île-de-France",
  market: [
    { key: "lpa", label: "Leads / annonce (moy.)", trendLabel: "+11%", trendDir: "up", barTone: "blue", barPct: 80, detail: "Vous : 2.4 · Marché : 2.1 · Concurrents similaires : 2.0" },
    { key: "conv", label: "Taux de conversion leads", trendLabel: "similaire", trendDir: "flat", barTone: "amber", barPct: 60, detail: "Vous : 18% · Marché : 17.5% · Concurrents : 19%" },
    { key: "delai", label: "Délai moyen de vente", trendLabel: "-3 jours", trendDir: "down", barTone: "red", barPct: 70, detail: "Vous : 28j · Marché : 25j · Concurrents : 24j" },
  ],
  trendingModels: [
    { name: "Tesla Model 3", pct: "+45%" },
    { name: "Renault Clio", pct: "+12%" },
    { name: "Peugeot 208", pct: "+8%" },
  ],
};

// ── Métriques de tri du Top / Flop (avec définitions pour les infobulles) ─────
export const TOPFLOP_METRICS: { key: AffiliateMetric; label: string; definition: string }[] = [
  { key: "roi", label: "ROI global", definition: "Valeur générée rapportée au coût média de la filiale." },
  { key: "prix", label: "Prix / ZDC", definition: "Alignement des prix de la filiale sur sa zone de chalandise." },
  { key: "reactivite", label: "Réactivité", definition: "Rapidité de traitement des leads par la filiale." },
  { key: "qualite", label: "Qualité", definition: "Qualité moyenne des annonces publiées par la filiale." },
  { key: "leadCost", label: "Coût / lead", definition: "Coût d'acquisition moyen d'un lead. Plus c'est bas, mieux c'est." },
];

// ── Assistant analyse (IA) ────────────────────────────────────────────────────
export const ASSISTANT_SUGGESTIONS = [
  "Filiales par Tesla Model 3",
  "Positionnement prix vs marché",
  "Réactivité leads < 2h",
  "Produits tendance",
];
export const ASSISTANT_PLACEHOLDER = "Posez n'importe quelle question sur votre réseau…";

// ── Insights IA (cartes d'alertes actionnables) ───────────────────────────────
export interface Insight {
  key: string;
  tone: "red" | "amber" | "green" | "blue";
  label: string;
  title: string;
  body: string;
  cta: string;
}
export const INSIGHTS: Insight[] = [
  {
    key: "action", tone: "red", label: "Action requise",
    title: "Marseille Prado : 5 annonces sous-pricées, 0 lead cette semaine",
    body: "Repriser dans la ZDC pourrait générer +8 leads estimés. CPL actuel : 6,40 € vs 1,80 € à Paris 15.",
    cta: "Repriser les annonces",
  },
  {
    key: "surveiller", tone: "amber", label: "À surveiller",
    title: "Réactivité leads en baisse sur Lille & Strasbourg — délai moyen 4h20",
    body: "Délai critique : leads contactés après 2h ont 3× moins de chances de convertir.",
    cta: "Alerter les équipes",
  },
  {
    key: "opportunite", tone: "green", label: "Opportunité",
    title: "Tesla Model 3 en forte demande (+45% WoW) — 3 filiales sans stock",
    body: "Bordeaux, Nantes, Strasbourg n'ont aucun Model 3 en stock. Fort potentiel de leads non captés.",
    cta: "Identifier les filiales",
  },
  {
    key: "optimisation", tone: "blue", label: "Optimisation",
    title: "62 annonces sans photo principale dans le réseau",
    body: "Une annonce avec photos génère en moyenne 3× plus de leads. Impact estimé : +18 leads/semaine.",
    cta: "Voir les annonces",
  },
];

// ── Packs ─────────────────────────────────────────────────────────────────────
export interface Pack {
  name: string;
  desc: string;
  price: string;
  recommended?: boolean;
}
export const PACKS: Pack[] = [
  { name: "Pack Visibilité Pro", desc: "Boost 10 annonces + mise en avant réseau", price: "290 €", recommended: true },
  { name: "Pack Leads Premium", desc: "Leads prioritaires + scoring qualité", price: "190 €" },
  { name: "Pack Analyse Marché", desc: "Données concurrence + sonar pricing", price: "99 €" },
  { name: "Pack Tout-en-un", desc: "Visibilité + Leads + Marché", price: "449 €" },
];

// ── Scores par annonce ──────────────────────────────────────────────────────
export interface AdScore {
  model: string;
  year: number;
  km: string;
  filiale: string;
  ago: string;
  views: number;
  leads: number;
  prix: number;
  leadsScore: number;
  qualite: number;
  tone: Tone; // couleur de la vignette véhicule
}
export const AD_SCORES: AdScore[] = [
  { model: "Tesla Model 3", year: 2022, km: "28 000 km", filiale: "Paris 15", ago: "il y a 3j", views: 18, leads: 6, prix: 92, leadsScore: 88, qualite: 71, tone: "red" },
  { model: "Renault Clio V", year: 2021, km: "45 000 km", filiale: "Lyon Sud", ago: "il y a 5j", views: 12, leads: 4, prix: 68, leadsScore: 79, qualite: 65, tone: "blue" },
  { model: "Peugeot 208", year: 2023, km: "12 000 km", filiale: "Bordeaux Berges", ago: "il y a 1j", views: 9, leads: 1, prix: 85, leadsScore: 41, qualite: 38, tone: "gray" },
  { model: "Volkswagen Golf 8", year: 2022, km: "33 000 km", filiale: "Marseille Prado", ago: "il y a 8j", views: 6, leads: 0, prix: 44, leadsScore: 32, qualite: 60, tone: "blue" },
];

// ── KPIs propres à une filiale (à partir de ses vraies valeurs) ───────────────
export function affiliateScoreCards(a: Affiliate): ScoreCard[] {
  const def = (k: string) => NETWORK_DASHBOARD.scores.find((s) => s.key === k)?.definition ?? "";
  const h = hashString(a.id);
  const sTone = (v: number): Tone => (v >= 75 ? "green" : v >= 50 ? "amber" : "red");
  const trendOf = (delta: number): { trend: string; trendDir: TrendDir } =>
    delta > 0 ? { trend: `+${delta} pts`, trendDir: "up" }
      : delta < 0 ? { trend: `${delta} pts`, trendDir: "down" }
        : { trend: "stable", trendDir: "flat" };
  const d = (i: number) => ((h >> (i * 3)) % 9) - 4;
  const cplUp = (h >> 7) % 2 === 0;
  const cplTone: Tone = a.leadCost <= 2.5 ? "green" : a.leadCost <= 4 ? "amber" : "red";

  return [
    { key: "roi", label: "ROI filiale", kind: "score", score: a.roi, tone: sTone(a.roi), definition: def("roi"), ...trendOf(a.wow) },
    { key: "prix", label: "Positionnement prix / ZDC", kind: "score", score: a.prix, tone: sTone(a.prix), definition: def("prix"), ...trendOf(d(1)) },
    { key: "reactivite", label: "Réactivité leads", kind: "score", score: a.reactivite, tone: sTone(a.reactivite), definition: def("reactivite"), ...trendOf(d(2)) },
    { key: "qualite", label: "Qualité des annonces", kind: "score", score: a.qualite, tone: sTone(a.qualite), definition: def("qualite"), ...trendOf(d(3)) },
    {
      key: "cpl", label: "Coût par lead", kind: "cost", display: `${a.leadCost.toFixed(2).replace(".", ",")} €`, tone: cplTone,
      trend: `${cplUp ? "+" : "-"}0,${10 + (h % 4) * 10} €`, trendDir: cplUp ? "up" : "down",
      definition: def("cpl"), footnote: `**${a.leads}** leads générés cette semaine`,
    },
  ];
}

// ── Variante filiale : décale les valeurs réseau de façon déterministe ────────
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
const clamp = (n: number, lo = 38, hi = 96) => Math.max(lo, Math.min(hi, n));

export function getFilialeDashboard(affiliateId: string): DashboardData {
  const h = hashString(affiliateId);
  const base = NETWORK_DASHBOARD;

  const scores: ScoreCard[] = base.scores.map((s, i) => {
    if (s.kind === "cost") {
      const cpl = (2.4 + (h % 40) / 10).toFixed(2).replace(".", ","); // 2,40 € … 6,30 €
      const deltaUp = (h >> 5) % 2 === 0;
      return {
        ...s,
        display: `${cpl} €`,
        trend: `${deltaUp ? "+" : "-"}0,${20 + (h % 5) * 10} €`,
        trendDir: deltaUp ? "up" : "down",
      };
    }
    const delta = ((h >> (i * 3)) % 23) - 11;
    const score = clamp((s.score ?? 60) + delta);
    const pts = ((h >> (i * 2)) % 13) - 6;
    const trendDir: TrendDir = pts > 1 ? "up" : pts < -1 ? "down" : "flat";
    const trend = trendDir === "flat" ? "stable" : `${pts > 0 ? "+" : ""}${pts} pts`;
    return { ...s, score, trend, trendDir };
  });

  return { ...base, scores };
}
