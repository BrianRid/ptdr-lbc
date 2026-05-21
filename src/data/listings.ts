import { AdParamFilters } from "./adparams";

export interface Listing {
  id: string;
  title: string;
  category: string;
  params: Record<string, string>;
  // Daily performance share relative to category total (0–1)
  weight: number;
}

export const LISTINGS: Listing[] = [
  // ── IMMOBILIER ──────────────────────────────────────────────────────────────
  { id: "immo_01", title: "Studio Paris 11e", category: "IMMOBILIER", weight: 0.04, params: { nb_pieces: "1", type_bien: "studio", classe_energie: "D", meuble: "oui", transaction: "location" } },
  { id: "immo_02", title: "T2 Lyon Part-Dieu", category: "IMMOBILIER", weight: 0.06, params: { nb_pieces: "2", type_bien: "appartement", classe_energie: "C", meuble: "non", transaction: "location" } },
  { id: "immo_03", title: "T3 Marseille centre", category: "IMMOBILIER", weight: 0.08, params: { nb_pieces: "3", type_bien: "appartement", classe_energie: "D", meuble: "non", transaction: "location" } },
  { id: "immo_04", title: "T3 Bordeaux Chartrons", category: "IMMOBILIER", weight: 0.07, params: { nb_pieces: "3", type_bien: "appartement", classe_energie: "B", meuble: "oui", transaction: "location" } },
  { id: "immo_05", title: "T4 Nantes centre", category: "IMMOBILIER", weight: 0.06, params: { nb_pieces: "4", type_bien: "appartement", classe_energie: "C", meuble: "non", transaction: "location" } },
  { id: "immo_06", title: "Maison T5 Toulouse", category: "IMMOBILIER", weight: 0.09, params: { nb_pieces: "5", type_bien: "maison", classe_energie: "E", meuble: "non", transaction: "vente" } },
  { id: "immo_07", title: "Maison T4 Lille", category: "IMMOBILIER", weight: 0.07, params: { nb_pieces: "4", type_bien: "maison", classe_energie: "F", meuble: "non", transaction: "vente" } },
  { id: "immo_08", title: "T2 Paris 15e", category: "IMMOBILIER", weight: 0.05, params: { nb_pieces: "2", type_bien: "appartement", classe_energie: "C", meuble: "oui", transaction: "location" } },
  { id: "immo_09", title: "Studio Lyon 3e", category: "IMMOBILIER", weight: 0.04, params: { nb_pieces: "1", type_bien: "studio", classe_energie: "E", meuble: "oui", transaction: "location" } },
  { id: "immo_10", title: "T3 Nice Promenade", category: "IMMOBILIER", weight: 0.08, params: { nb_pieces: "3", type_bien: "appartement", classe_energie: "B", meuble: "non", transaction: "vente" } },
  { id: "immo_11", title: "Terrain constructible Rennes", category: "IMMOBILIER", weight: 0.05, params: { nb_pieces: "1", type_bien: "terrain", classe_energie: "A", meuble: "non", transaction: "vente" } },
  { id: "immo_12", title: "Local commercial Paris 9e", category: "IMMOBILIER", weight: 0.04, params: { nb_pieces: "2", type_bien: "local", classe_energie: "D", meuble: "non", transaction: "location" } },
  { id: "immo_13", title: "T4 Strasbourg centre", category: "IMMOBILIER", weight: 0.06, params: { nb_pieces: "4", type_bien: "appartement", classe_energie: "C", meuble: "non", transaction: "vente" } },
  { id: "immo_14", title: "T3 meublé Montpellier", category: "IMMOBILIER", weight: 0.07, params: { nb_pieces: "3", type_bien: "appartement", classe_energie: "B", meuble: "oui", transaction: "location" } },
  { id: "immo_15", title: "Maison T3 Bordeaux sud", category: "IMMOBILIER", weight: 0.05, params: { nb_pieces: "3", type_bien: "maison", classe_energie: "A", meuble: "non", transaction: "vente" } },
  { id: "immo_16", title: "T5 Paris 16e", category: "IMMOBILIER", weight: 0.08, params: { nb_pieces: "5", type_bien: "appartement", classe_energie: "B", meuble: "non", transaction: "vente" } },
  { id: "immo_17", title: "T2 Grenoble centre", category: "IMMOBILIER", weight: 0.03, params: { nb_pieces: "2", type_bien: "appartement", classe_energie: "D", meuble: "non", transaction: "location" } },
  { id: "immo_18", title: "Box parking Lyon 7e", category: "IMMOBILIER", weight: 0.02, params: { nb_pieces: "1", type_bien: "parking", classe_energie: "G", meuble: "non", transaction: "location" } },

  // ── VÉHICULES ────────────────────────────────────────────────────────────────
  { id: "veh_01", title: "Renault Zoé 2023", category: "VÉHICULES", weight: 0.09, params: { energie: "electrique", boite_vitesse: "automatique", marque: "renault", annee_modele: "2023" } },
  { id: "veh_02", title: "Tesla Model 3 2024", category: "VÉHICULES", weight: 0.10, params: { energie: "electrique", boite_vitesse: "automatique", marque: "tesla", annee_modele: "2024" } },
  { id: "veh_03", title: "Peugeot e-208 2022", category: "VÉHICULES", weight: 0.07, params: { energie: "electrique", boite_vitesse: "automatique", marque: "peugeot", annee_modele: "2022" } },
  { id: "veh_04", title: "Toyota Yaris Hybride 2023", category: "VÉHICULES", weight: 0.08, params: { energie: "hybride", boite_vitesse: "automatique", marque: "toyota", annee_modele: "2023" } },
  { id: "veh_05", title: "Peugeot 308 Diesel 2021", category: "VÉHICULES", weight: 0.06, params: { energie: "diesel", boite_vitesse: "manuelle", marque: "peugeot", annee_modele: "2021" } },
  { id: "veh_06", title: "Renault Clio Essence 2022", category: "VÉHICULES", weight: 0.07, params: { energie: "essence", boite_vitesse: "manuelle", marque: "renault", annee_modele: "2022" } },
  { id: "veh_07", title: "BMW Série 3 2020", category: "VÉHICULES", weight: 0.06, params: { energie: "diesel", boite_vitesse: "automatique", marque: "bmw", annee_modele: "2020" } },
  { id: "veh_08", title: "Mercedes Classe A 2021", category: "VÉHICULES", weight: 0.06, params: { energie: "essence", boite_vitesse: "automatique", marque: "mercedes", annee_modele: "2021" } },
  { id: "veh_09", title: "Citroën C3 2022", category: "VÉHICULES", weight: 0.05, params: { energie: "essence", boite_vitesse: "manuelle", marque: "citroen", annee_modele: "2022" } },
  { id: "veh_10", title: "Volkswagen Golf Hybride 2023", category: "VÉHICULES", weight: 0.07, params: { energie: "hybride_rechargeable", boite_vitesse: "automatique", marque: "volkswagen", annee_modele: "2023" } },
  { id: "veh_11", title: "Ford Puma 2021", category: "VÉHICULES", weight: 0.05, params: { energie: "essence", boite_vitesse: "manuelle", marque: "ford", annee_modele: "2021" } },
  { id: "veh_12", title: "Renault Megane E-Tech 2024", category: "VÉHICULES", weight: 0.08, params: { energie: "electrique", boite_vitesse: "automatique", marque: "renault", annee_modele: "2024" } },
  { id: "veh_13", title: "Toyota C-HR Hybride 2022", category: "VÉHICULES", weight: 0.06, params: { energie: "hybride", boite_vitesse: "automatique", marque: "toyota", annee_modele: "2022" } },
  { id: "veh_14", title: "Citroën ë-C4 2023", category: "VÉHICULES", weight: 0.07, params: { energie: "electrique", boite_vitesse: "automatique", marque: "citroen", annee_modele: "2023" } },
  { id: "veh_15", title: "BMW i4 2024", category: "VÉHICULES", weight: 0.08, params: { energie: "electrique", boite_vitesse: "automatique", marque: "bmw", annee_modele: "2024" } },

];

/**
 * Returns a weight (0–1) representing the share of performance
 * that matches the given adparam filters within a category.
 * An empty filters object means "no filter" → weight = 1.
 */
export function computeFilterWeight(
  category: string,
  filters: AdParamFilters
): number {
  const activeFilters = Object.entries(filters).filter(([, vals]) => vals.length > 0);
  if (activeFilters.length === 0) return 1;

  const categoryListings = LISTINGS.filter((l) => {
    // Map "IMMOBILIER" filter category to listing categories
    return true; // include all categories when no category restriction
  });

  const totalWeight = LISTINGS.reduce((sum, l) => sum + l.weight, 0);

  const matchingWeight = LISTINGS.filter((listing) => {
    return activeFilters.every(([paramId, selectedValues]) => {
      const listingValue = listing.params[paramId];
      return listingValue !== undefined && selectedValues.includes(listingValue);
    });
  }).reduce((sum, l) => sum + l.weight, 0);

  if (totalWeight === 0) return 1;
  // Clamp between 0.02 and 1 so chart never goes completely empty
  return Math.max(0.02, matchingWeight / totalWeight);
}
