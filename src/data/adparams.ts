export interface AdParamOption {
  value: string;
  label: string;
}

export interface AdParamDef {
  id: string;
  category: string;
  label: string;
  required: boolean;
  options: AdParamOption[];
}

export const AD_PARAM_DEFS: AdParamDef[] = [
  // VÉHICULE
  {
    id: "marque",
    category: "VÉHICULE",
    label: "Marque",
    required: true,
    options: [
      { value: "renault", label: "Renault" },
      { value: "peugeot", label: "Peugeot" },
      { value: "citroen", label: "Citroën" },
      { value: "dacia", label: "Dacia" },
      { value: "volkswagen", label: "Volkswagen" },
      { value: "audi", label: "Audi" },
      { value: "bmw", label: "BMW" },
      { value: "mercedes", label: "Mercedes" },
      { value: "toyota", label: "Toyota" },
      { value: "ford", label: "Ford" },
      { value: "tesla", label: "Tesla" },
      { value: "yamaha", label: "Yamaha" },
    ],
  },
  {
    id: "carrosserie",
    category: "VÉHICULE",
    label: "Carrosserie",
    required: true,
    options: [
      { value: "citadine", label: "Citadine" },
      { value: "berline", label: "Berline" },
      { value: "break", label: "Break" },
      { value: "suv", label: "SUV / 4x4" },
      { value: "monospace", label: "Monospace" },
      { value: "coupe", label: "Coupé / Cabriolet" },
      { value: "utilitaire", label: "Utilitaire" },
    ],
  },
  {
    id: "annee_modele",
    category: "VÉHICULE",
    label: "Année modèle",
    required: true,
    options: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((v) => ({ value: v, label: v })),
  },
  {
    id: "kilometrage",
    category: "VÉHICULE",
    label: "Kilométrage",
    required: false,
    options: [
      { value: "0_20000", label: "< 20 000 km" },
      { value: "20000_60000", label: "20 000 – 60 000 km" },
      { value: "60000_100000", label: "60 000 – 100 000 km" },
      { value: "100000_plus", label: "> 100 000 km" },
    ],
  },

  // MOTORISATION
  {
    id: "energie",
    category: "MOTORISATION",
    label: "Énergie",
    required: true,
    options: [
      { value: "essence", label: "Essence" },
      { value: "diesel", label: "Diesel" },
      { value: "electrique", label: "Électrique" },
      { value: "hybride", label: "Hybride" },
      { value: "hybride_rechargeable", label: "Hybride rechargeable" },
      { value: "gpl", label: "GPL" },
    ],
  },
  {
    id: "boite_vitesse",
    category: "MOTORISATION",
    label: "Boîte de vitesse",
    required: true,
    options: [
      { value: "manuelle", label: "Manuelle" },
      { value: "automatique", label: "Automatique" },
    ],
  },
  {
    id: "nb_portes",
    category: "MOTORISATION",
    label: "Nombre de portes",
    required: false,
    options: [
      { value: "3", label: "3 portes" },
      { value: "5", label: "5 portes" },
    ],
  },

  // ÉTAT & PRIX
  {
    id: "etat",
    category: "ÉTAT & PRIX",
    label: "État",
    required: true,
    options: [
      { value: "neuf", label: "Neuf" },
      { value: "occasion", label: "Occasion" },
    ],
  },
  {
    id: "prix",
    category: "ÉTAT & PRIX",
    label: "Budget",
    required: false,
    options: [
      { value: "0_10000", label: "< 10 000 €" },
      { value: "10000_20000", label: "10 000 – 20 000 €" },
      { value: "20000_35000", label: "20 000 – 35 000 €" },
      { value: "35000_plus", label: "> 35 000 €" },
    ],
  },
];

export const AD_PARAM_CATEGORIES = [...new Set(AD_PARAM_DEFS.map((p) => p.category))];

export type AdParamFilters = Record<string, string[]>;
