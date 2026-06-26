import { Affiliate } from "./affiliates";

export type AnnonceStatus = "active" | "boost" | "expiring";

export interface Annonce {
  id: string;
  model: string;
  year: number;
  km: number;
  price: number;
  views: number;
  leads: number;
  daysOnline: number;
  prix: number; // score /100
  leadsScore: number; // score /100
  qualite: number; // score /100
  status: AnnonceStatus;
}

const MODELS: { model: string; base: number }[] = [
  { model: "Renault Clio V", base: 14990 },
  { model: "Peugeot 208", base: 16500 },
  { model: "Citroën C3", base: 13900 },
  { model: "Tesla Model 3", base: 36900 },
  { model: "Volkswagen Golf 8", base: 24500 },
  { model: "Toyota Yaris", base: 18900 },
  { model: "Dacia Sandero", base: 11900 },
  { model: "BMW Série 1", base: 28900 },
  { model: "Renault Captur", base: 19900 },
  { model: "Peugeot 3008", base: 27900 },
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const clamp = (v: number, lo = 22, hi = 98) => Math.max(lo, Math.min(hi, v));

/** Génère, de façon déterministe, les annonces en ligne d'une filiale. */
export function getFilialeAnnonces(a: Affiliate): Annonce[] {
  const count = Math.max(4, Math.min(a.adsCount, 10));
  return Array.from({ length: count }, (_, i) => {
    const h = hash(`${a.id}:${i}`);
    const m = MODELS[h % MODELS.length];
    const year = 2019 + (h % 7);
    const km = (5 + ((h >> 2) % 95)) * 1000;
    const price = m.base + (((h >> 3) % 40) - 10) * 100;
    const views = 3 + ((h >> 5) % 38);
    const leads = Math.max(0, Math.round(views * (a.reactivite / 130)) - ((h >> 4) % 3));
    const prix = clamp(a.prix + (((h >> 4) % 21) - 10));
    const leadsScore = clamp(a.roi + (((h >> 6) % 25) - 12));
    const qualite = clamp(a.qualite + (((h >> 8) % 21) - 10));
    const daysOnline = 1 + (h % 24);
    const status: AnnonceStatus = daysOnline >= 18 ? "expiring" : h % 6 === 0 ? "boost" : "active";
    return { id: `${a.id}-${i}`, model: m.model, year, km, price, views, leads, daysOnline, prix, leadsScore, qualite, status };
  });
}

export const ANNONCE_STATUS_META: Record<AnnonceStatus, { label: string; tone: "green" | "blue" | "amber" }> = {
  active: { label: "En ligne", tone: "green" },
  boost: { label: "En avant", tone: "blue" },
  expiring: { label: "Expire bientôt", tone: "amber" },
};
