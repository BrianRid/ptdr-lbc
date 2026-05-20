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
  // IMMOBILIER
  {
    id: "nb_pieces",
    category: "IMMOBILIER",
    label: "Nombre de pièces",
    required: true,
    options: [
      { value: "1", label: "T1 / Studio" },
      { value: "2", label: "T2" },
      { value: "3", label: "T3" },
      { value: "4", label: "T4" },
      { value: "5", label: "T5 et +" },
    ],
  },
  {
    id: "type_bien",
    category: "IMMOBILIER",
    label: "Type de bien",
    required: true,
    options: [
      { value: "appartement", label: "Appartement" },
      { value: "maison", label: "Maison" },
      { value: "studio", label: "Studio" },
      { value: "terrain", label: "Terrain" },
      { value: "parking", label: "Parking / Box" },
      { value: "local", label: "Local commercial" },
    ],
  },
  {
    id: "classe_energie",
    category: "IMMOBILIER",
    label: "Classe énergie",
    required: true,
    options: ["A", "B", "C", "D", "E", "F", "G"].map((v) => ({ value: v, label: `Classe ${v}` })),
  },
  {
    id: "meuble",
    category: "IMMOBILIER",
    label: "Meublé",
    required: false,
    options: [
      { value: "oui", label: "Meublé" },
      { value: "non", label: "Non meublé" },
    ],
  },
  {
    id: "transaction",
    category: "IMMOBILIER",
    label: "Type de transaction",
    required: true,
    options: [
      { value: "vente", label: "Vente" },
      { value: "location", label: "Location" },
      { value: "location_saisonniere", label: "Location saisonnière" },
    ],
  },

  // VÉHICULES
  {
    id: "energie",
    category: "VÉHICULES",
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
    category: "VÉHICULES",
    label: "Boîte de vitesse",
    required: true,
    options: [
      { value: "manuelle", label: "Manuelle" },
      { value: "automatique", label: "Automatique" },
    ],
  },
  {
    id: "marque",
    category: "VÉHICULES",
    label: "Marque",
    required: true,
    options: [
      { value: "renault", label: "Renault" },
      { value: "peugeot", label: "Peugeot" },
      { value: "citroen", label: "Citroën" },
      { value: "bmw", label: "BMW" },
      { value: "mercedes", label: "Mercedes" },
      { value: "toyota", label: "Toyota" },
      { value: "volkswagen", label: "Volkswagen" },
      { value: "ford", label: "Ford" },
      { value: "tesla", label: "Tesla" },
    ],
  },
  {
    id: "annee_modele",
    category: "VÉHICULES",
    label: "Année modèle",
    required: true,
    options: ["2019", "2020", "2021", "2022", "2023", "2024"].map((v) => ({ value: v, label: v })),
  },

  // EMPLOI
  {
    id: "type_contrat",
    category: "EMPLOI",
    label: "Type de contrat",
    required: true,
    options: [
      { value: "cdi", label: "CDI" },
      { value: "cdd", label: "CDD" },
      { value: "freelance", label: "Freelance" },
      { value: "interim", label: "Intérim" },
      { value: "stage", label: "Stage" },
      { value: "alternance", label: "Alternance" },
    ],
  },
  {
    id: "secteur",
    category: "EMPLOI",
    label: "Secteur d'activité",
    required: true,
    options: [
      { value: "tech", label: "Tech & Digital" },
      { value: "commerce", label: "Commerce & Vente" },
      { value: "btp", label: "BTP & Construction" },
      { value: "sante", label: "Santé" },
      { value: "education", label: "Éducation" },
      { value: "finance", label: "Finance & Banque" },
    ],
  },
  {
    id: "teletravail",
    category: "EMPLOI",
    label: "Télétravail",
    required: false,
    options: [
      { value: "oui", label: "Full remote" },
      { value: "partiel", label: "Hybride" },
      { value: "non", label: "Présentiel" },
    ],
  },
];

export const AD_PARAM_CATEGORIES = [...new Set(AD_PARAM_DEFS.map((p) => p.category))];

export type AdParamFilters = Record<string, string[]>;
