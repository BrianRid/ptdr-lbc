export interface Affiliate {
  id: string;
  name: string;
  city: string;
  postalCode: string;
  region: string;
  adsCount: number; // annonces actives
  leads: number;
  leadCost: number; // CPL (€)
  // Scores /100 par dimension.
  roi: number;
  prix: number;
  reactivite: number;
  qualite: number;
  wow: number; // évolution semaine / semaine (en points de ROI)
}

export const NETWORK = {
  name: "PEYROT INVESTISSEMENTS",
  segment: "leboncoin auto",
};

// Établissements (filiales) rattachés à la tête de réseau — triés par ROI décroissant.
export const AFFILIATES: Affiliate[] = [
  { id: "paris-15-moteurs", name: "Paris 15 — Moteurs", city: "Paris", postalCode: "75015", region: "Île-de-France", adsCount: 47, leads: 34, leadCost: 1.8, roi: 91, prix: 88, reactivite: 82, qualite: 89, wow: 6 },
  { id: "lyon-sud-auto", name: "Lyon Sud Auto", city: "Lyon", postalCode: "69007", region: "Auvergne-Rhône-Alpes", adsCount: 38, leads: 28, leadCost: 2.1, roi: 83, prix: 81, reactivite: 78, qualite: 81, wow: 3 },
  { id: "bordeaux-berges", name: "Bordeaux Berges", city: "Bordeaux", postalCode: "33000", region: "Nouvelle-Aquitaine", adsCount: 31, leads: 21, leadCost: 2.8, roi: 72, prix: 75, reactivite: 70, qualite: 74, wow: 1 },
  { id: "lille-centre-autos", name: "Lille Centre Autos", city: "Lille", postalCode: "59000", region: "Hauts-de-France", adsCount: 24, leads: 16, leadCost: 3.5, roi: 65, prix: 70, reactivite: 48, qualite: 68, wow: -2 },
  { id: "nice-cote-azur", name: "Nice Côte d'Azur", city: "Nice", postalCode: "06000", region: "Provence-Alpes-Côte d'Azur", adsCount: 29, leads: 14, leadCost: 3.7, roi: 63, prix: 66, reactivite: 72, qualite: 62, wow: 0 },
  { id: "toulouse-garonne", name: "Toulouse Garonne", city: "Toulouse", postalCode: "31000", region: "Occitanie", adsCount: 22, leads: 13, leadCost: 3.9, roi: 60, prix: 58, reactivite: 65, qualite: 71, wow: 2 },
  { id: "rennes-ouest", name: "Rennes Ouest", city: "Rennes", postalCode: "35000", region: "Bretagne", adsCount: 18, leads: 11, leadCost: 4.2, roi: 57, prix: 62, reactivite: 60, qualite: 55, wow: -1 },
  { id: "montpellier-arena", name: "Montpellier Arena", city: "Montpellier", postalCode: "34000", region: "Occitanie", adsCount: 16, leads: 10, leadCost: 4.4, roi: 55, prix: 60, reactivite: 55, qualite: 58, wow: 0 },
  { id: "grenoble-alpes", name: "Grenoble Alpes", city: "Grenoble", postalCode: "38000", region: "Auvergne-Rhône-Alpes", adsCount: 14, leads: 10, leadCost: 4.6, roi: 53, prix: 55, reactivite: 58, qualite: 52, wow: 1 },
  { id: "strasbourg-est", name: "Strasbourg Est", city: "Strasbourg", postalCode: "67000", region: "Grand Est", adsCount: 11, leads: 10, leadCost: 4.7, roi: 51, prix: 55, reactivite: 50, qualite: 44, wow: -3 },
  { id: "nantes-atlantis", name: "Nantes Atlantis", city: "Nantes", postalCode: "44000", region: "Pays de la Loire", adsCount: 13, leads: 7, leadCost: 5.9, roi: 44, prix: 48, reactivite: 45, qualite: 41, wow: -2 },
  { id: "marseille-prado", name: "Marseille Prado", city: "Marseille", postalCode: "13008", region: "Provence-Alpes-Côte d'Azur", adsCount: 10, leads: 9, leadCost: 6.4, roi: 38, prix: 52, reactivite: 28, qualite: 45, wow: -1 },
];

export const TOTAL_ADS = AFFILIATES.reduce((sum, a) => sum + a.adsCount, 0);

export type AffiliateMetric = "roi" | "prix" | "reactivite" | "qualite" | "leadCost";

/** Trie les filiales par métrique, des meilleures aux pires. */
export function rankAffiliates(metric: AffiliateMetric): Affiliate[] {
  const lowerIsBetter = metric === "leadCost";
  return [...AFFILIATES].sort((a, b) => {
    const diff = a[metric] - b[metric];
    return lowerIsBetter ? diff : -diff;
  });
}

export function getAffiliate(id: string): Affiliate | undefined {
  return AFFILIATES.find((a) => a.id === id);
}

/** Liste des régions distinctes (pour le filtre). */
export function affiliateRegions(): string[] {
  return [...new Set(AFFILIATES.map((a) => a.region))].sort();
}

export type StatusTone = "green" | "amber" | "red";
/** Statut dérivé du ROI : ≥80 On track · ≥50 À surveiller · sinon Critique. */
export function statusOf(a: Affiliate): { label: string; tone: StatusTone } {
  if (a.roi >= 80) return { label: "On track", tone: "green" };
  if (a.roi >= 50) return { label: "À surveiller", tone: "amber" };
  return { label: "Critique", tone: "red" };
}

/** Convertit le CPL en score /100 (plus le coût est bas, plus le score est haut). */
export function cplScore(leadCost: number): number {
  return Math.max(0, Math.min(100, Math.round(100 - (leadCost - 1.0) * 16)));
}

/** Share of the network's performance attributable to one affiliate (0–1). */
export function affiliateScale(a: Affiliate): number {
  return TOTAL_ADS === 0 ? 1 : a.adsCount / TOTAL_ADS;
}
