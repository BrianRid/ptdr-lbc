export const REGIONS: Record<string, { name: string; departments: { code: string; name: string }[] }> = {
  "11": {
    name: "Île-de-France",
    departments: [
      { code: "75", name: "Paris" },
      { code: "77", name: "Seine-et-Marne" },
      { code: "78", name: "Yvelines" },
      { code: "91", name: "Essonne" },
      { code: "92", name: "Hauts-de-Seine" },
      { code: "93", name: "Seine-Saint-Denis" },
      { code: "94", name: "Val-de-Marne" },
      { code: "95", name: "Val-d'Oise" },
    ],
  },
  "32": {
    name: "Hauts-de-France",
    departments: [
      { code: "02", name: "Aisne" },
      { code: "59", name: "Nord" },
      { code: "60", name: "Oise" },
      { code: "62", name: "Pas-de-Calais" },
      { code: "80", name: "Somme" },
    ],
  },
  "44": {
    name: "Grand Est",
    departments: [
      { code: "08", name: "Ardennes" },
      { code: "10", name: "Aube" },
      { code: "51", name: "Marne" },
      { code: "52", name: "Haute-Marne" },
      { code: "54", name: "Meurthe-et-Moselle" },
      { code: "55", name: "Meuse" },
      { code: "57", name: "Moselle" },
      { code: "67", name: "Bas-Rhin" },
      { code: "68", name: "Haut-Rhin" },
      { code: "88", name: "Vosges" },
    ],
  },
  "28": {
    name: "Normandie",
    departments: [
      { code: "14", name: "Calvados" },
      { code: "27", name: "Eure" },
      { code: "50", name: "Manche" },
      { code: "61", name: "Orne" },
      { code: "76", name: "Seine-Maritime" },
    ],
  },
  "53": {
    name: "Bretagne",
    departments: [
      { code: "22", name: "Côtes-d'Armor" },
      { code: "29", name: "Finistère" },
      { code: "35", name: "Ille-et-Vilaine" },
      { code: "56", name: "Morbihan" },
    ],
  },
  "52": {
    name: "Pays de la Loire",
    departments: [
      { code: "44", name: "Loire-Atlantique" },
      { code: "49", name: "Maine-et-Loire" },
      { code: "53", name: "Mayenne" },
      { code: "72", name: "Sarthe" },
      { code: "85", name: "Vendée" },
    ],
  },
  "24": {
    name: "Centre-Val de Loire",
    departments: [
      { code: "18", name: "Cher" },
      { code: "28", name: "Eure-et-Loir" },
      { code: "36", name: "Indre" },
      { code: "37", name: "Indre-et-Loire" },
      { code: "41", name: "Loir-et-Cher" },
      { code: "45", name: "Loiret" },
    ],
  },
  "27": {
    name: "Bourgogne-Franche-Comté",
    departments: [
      { code: "21", name: "Côte-d'Or" },
      { code: "25", name: "Doubs" },
      { code: "39", name: "Jura" },
      { code: "58", name: "Nièvre" },
      { code: "70", name: "Haute-Saône" },
      { code: "71", name: "Saône-et-Loire" },
      { code: "89", name: "Yonne" },
      { code: "90", name: "Territoire de Belfort" },
    ],
  },
  "84": {
    name: "Auvergne-Rhône-Alpes",
    departments: [
      { code: "01", name: "Ain" },
      { code: "03", name: "Allier" },
      { code: "07", name: "Ardèche" },
      { code: "15", name: "Cantal" },
      { code: "26", name: "Drôme" },
      { code: "38", name: "Isère" },
      { code: "42", name: "Loire" },
      { code: "43", name: "Haute-Loire" },
      { code: "63", name: "Puy-de-Dôme" },
      { code: "69", name: "Rhône" },
      { code: "73", name: "Savoie" },
      { code: "74", name: "Haute-Savoie" },
    ],
  },
  "76": {
    name: "Occitanie",
    departments: [
      { code: "09", name: "Ariège" },
      { code: "11", name: "Aude" },
      { code: "12", name: "Aveyron" },
      { code: "30", name: "Gard" },
      { code: "31", name: "Haute-Garonne" },
      { code: "32", name: "Gers" },
      { code: "34", name: "Hérault" },
      { code: "46", name: "Lot" },
      { code: "48", name: "Lozère" },
      { code: "65", name: "Hautes-Pyrénées" },
      { code: "66", name: "Pyrénées-Orientales" },
      { code: "81", name: "Tarn" },
      { code: "82", name: "Tarn-et-Garonne" },
    ],
  },
  "75": {
    name: "Nouvelle-Aquitaine",
    departments: [
      { code: "16", name: "Charente" },
      { code: "17", name: "Charente-Maritime" },
      { code: "19", name: "Corrèze" },
      { code: "23", name: "Creuse" },
      { code: "24", name: "Dordogne" },
      { code: "33", name: "Gironde" },
      { code: "40", name: "Landes" },
      { code: "47", name: "Lot-et-Garonne" },
      { code: "64", name: "Pyrénées-Atlantiques" },
      { code: "79", name: "Deux-Sèvres" },
      { code: "86", name: "Vienne" },
      { code: "87", name: "Haute-Vienne" },
    ],
  },
  "93": {
    name: "Provence-Alpes-Côte d'Azur",
    departments: [
      { code: "04", name: "Alpes-de-Haute-Provence" },
      { code: "05", name: "Hautes-Alpes" },
      { code: "06", name: "Alpes-Maritimes" },
      { code: "13", name: "Bouches-du-Rhône" },
      { code: "83", name: "Var" },
      { code: "84", name: "Vaucluse" },
    ],
  },
  "94": {
    name: "Corse",
    departments: [
      { code: "2A", name: "Corse-du-Sud" },
      { code: "2B", name: "Haute-Corse" },
    ],
  },
};

export const CATEGORIES = [
  { value: "all", label: "Tous véhicules" },
  { value: "voitures", label: "Voitures" },
  { value: "utilitaires", label: "Utilitaires" },
  { value: "motos", label: "Motos & scooters" },
];

export const DATE_RANGES = [
  { value: "current_week", label: "Semaine en cours" },
  { value: "last_30", label: "30 derniers jours" },
  { value: "current_month", label: "Ce mois" },
  { value: "quarter", label: "Ce trimestre" },
];

// Seeded PRNG (mulberry32) for deterministic SSR/CSR output
let _seed = 0x12345678;
function seededRand(): number {
  _seed |= 0;
  _seed = (_seed + 0x6d2b79f5) | 0;
  let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function rand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}

export interface DailyData {
  date: string;
  apparitions: number;
  clics: number;
  favoris: number;
  messages: number;
  appels: number;
}

export interface KpiTotals {
  apparitions: number;
  clics: number;
  favoris: number;
  messages: number;
  appels: number;
}

function generateDailyData(days: number, baseDate: Date): DailyData[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - (days - 1 - i));
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const multiplier = isWeekend ? 0.4 : 1;
    return {
      date: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
      apparitions: Math.round(rand(280000, 380000) * multiplier),
      clics: Math.round(rand(3000, 4500) * multiplier),
      favoris: Math.round(rand(90, 150) * multiplier),
      messages: Math.round(rand(12, 22) * multiplier),
      appels: Math.round(rand(35, 60) * multiplier),
    };
  });
}

const today = new Date(2026, 4, 20); // May 20 2026

export const MOCK_DATA: Record<string, Record<string, DailyData[]>> = {
  current_week: {
    all: generateDailyData(7, today),
    voitures: generateDailyData(7, today),
    utilitaires: generateDailyData(7, today),
    motos: generateDailyData(7, today),
  },
  last_30: {
    all: generateDailyData(30, today),
    voitures: generateDailyData(30, today),
    utilitaires: generateDailyData(30, today),
    motos: generateDailyData(30, today),
  },
  current_month: {
    all: generateDailyData(20, today),
    voitures: generateDailyData(20, today),
    utilitaires: generateDailyData(20, today),
    motos: generateDailyData(20, today),
  },
  quarter: {
    all: generateDailyData(90, today),
    voitures: generateDailyData(90, today),
    utilitaires: generateDailyData(90, today),
    motos: generateDailyData(90, today),
  },
};

export function computeTotals(data: DailyData[]): KpiTotals {
  return data.reduce(
    (acc, d) => ({
      apparitions: acc.apparitions + d.apparitions,
      clics: acc.clics + d.clics,
      favoris: acc.favoris + d.favoris,
      messages: acc.messages + d.messages,
      appels: acc.appels + d.appels,
    }),
    { apparitions: 0, clics: 0, favoris: 0, messages: 0, appels: 0 }
  );
}
