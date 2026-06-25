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
  // ── VOITURES ─────────────────────────────────────────────────────────────────
  { id: "veh_01", title: "Renault Zoé 2023", category: "voitures", weight: 0.07, params: { marque: "renault", carrosserie: "citadine", annee_modele: "2023", kilometrage: "20000_60000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "10000_20000" } },
  { id: "veh_02", title: "Tesla Model 3 2024", category: "voitures", weight: 0.08, params: { marque: "tesla", carrosserie: "berline", annee_modele: "2024", kilometrage: "0_20000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "35000_plus" } },
  { id: "veh_03", title: "Peugeot e-208 2022", category: "voitures", weight: 0.06, params: { marque: "peugeot", carrosserie: "citadine", annee_modele: "2022", kilometrage: "20000_60000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_04", title: "Toyota Yaris Hybride 2023", category: "voitures", weight: 0.07, params: { marque: "toyota", carrosserie: "citadine", annee_modele: "2023", kilometrage: "0_20000", energie: "hybride", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_05", title: "Peugeot 308 Diesel 2021", category: "voitures", weight: 0.05, params: { marque: "peugeot", carrosserie: "berline", annee_modele: "2021", kilometrage: "60000_100000", energie: "diesel", boite_vitesse: "manuelle", nb_portes: "5", etat: "occasion", prix: "10000_20000" } },
  { id: "veh_06", title: "Renault Clio Essence 2022", category: "voitures", weight: 0.06, params: { marque: "renault", carrosserie: "citadine", annee_modele: "2022", kilometrage: "20000_60000", energie: "essence", boite_vitesse: "manuelle", nb_portes: "5", etat: "occasion", prix: "10000_20000" } },
  { id: "veh_07", title: "BMW Série 3 2020", category: "voitures", weight: 0.05, params: { marque: "bmw", carrosserie: "berline", annee_modele: "2020", kilometrage: "60000_100000", energie: "diesel", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_08", title: "Mercedes Classe A 2021", category: "voitures", weight: 0.05, params: { marque: "mercedes", carrosserie: "berline", annee_modele: "2021", kilometrage: "20000_60000", energie: "essence", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_09", title: "Citroën C3 2022", category: "voitures", weight: 0.05, params: { marque: "citroen", carrosserie: "citadine", annee_modele: "2022", kilometrage: "20000_60000", energie: "essence", boite_vitesse: "manuelle", nb_portes: "5", etat: "occasion", prix: "10000_20000" } },
  { id: "veh_10", title: "Volkswagen Golf GTE 2023", category: "voitures", weight: 0.06, params: { marque: "volkswagen", carrosserie: "berline", annee_modele: "2023", kilometrage: "0_20000", energie: "hybride_rechargeable", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_11", title: "Audi Q3 2024", category: "voitures", weight: 0.06, params: { marque: "audi", carrosserie: "suv", annee_modele: "2024", kilometrage: "0_20000", energie: "essence", boite_vitesse: "automatique", nb_portes: "5", etat: "neuf", prix: "35000_plus" } },
  { id: "veh_12", title: "Renault Mégane E-Tech 2024", category: "voitures", weight: 0.07, params: { marque: "renault", carrosserie: "berline", annee_modele: "2024", kilometrage: "0_20000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "neuf", prix: "35000_plus" } },
  { id: "veh_13", title: "Dacia Sandero 2023", category: "voitures", weight: 0.05, params: { marque: "dacia", carrosserie: "citadine", annee_modele: "2023", kilometrage: "20000_60000", energie: "gpl", boite_vitesse: "manuelle", nb_portes: "5", etat: "occasion", prix: "0_10000" } },
  { id: "veh_14", title: "Citroën ë-C4 2023", category: "voitures", weight: 0.05, params: { marque: "citroen", carrosserie: "suv", annee_modele: "2023", kilometrage: "20000_60000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_15", title: "BMW i4 2024", category: "voitures", weight: 0.06, params: { marque: "bmw", carrosserie: "berline", annee_modele: "2024", kilometrage: "0_20000", energie: "electrique", boite_vitesse: "automatique", nb_portes: "5", etat: "neuf", prix: "35000_plus" } },
  { id: "veh_16", title: "Toyota C-HR Hybride 2022", category: "voitures", weight: 0.05, params: { marque: "toyota", carrosserie: "suv", annee_modele: "2022", kilometrage: "20000_60000", energie: "hybride", boite_vitesse: "automatique", nb_portes: "5", etat: "occasion", prix: "20000_35000" } },
  { id: "veh_17", title: "Ford Puma Essence 2021", category: "voitures", weight: 0.04, params: { marque: "ford", carrosserie: "suv", annee_modele: "2021", kilometrage: "60000_100000", energie: "essence", boite_vitesse: "manuelle", nb_portes: "5", etat: "occasion", prix: "10000_20000" } },
  { id: "veh_18", title: "Peugeot 208 GTi 2020", category: "voitures", weight: 0.03, params: { marque: "peugeot", carrosserie: "coupe", annee_modele: "2020", kilometrage: "100000_plus", energie: "essence", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "10000_20000" } },

  // ── UTILITAIRES ──────────────────────────────────────────────────────────────
  { id: "uti_01", title: "Renault Trafic L2H1 2022", category: "utilitaires", weight: 0.05, params: { marque: "renault", carrosserie: "utilitaire", annee_modele: "2022", kilometrage: "20000_60000", energie: "diesel", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "20000_35000" } },
  { id: "uti_02", title: "Peugeot Partner 2023", category: "utilitaires", weight: 0.04, params: { marque: "peugeot", carrosserie: "utilitaire", annee_modele: "2023", kilometrage: "0_20000", energie: "diesel", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "20000_35000" } },
  { id: "uti_03", title: "Citroën Jumpy 2021", category: "utilitaires", weight: 0.04, params: { marque: "citroen", carrosserie: "utilitaire", annee_modele: "2021", kilometrage: "60000_100000", energie: "diesel", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "10000_20000" } },
  { id: "uti_04", title: "Ford Transit Custom 2024", category: "utilitaires", weight: 0.05, params: { marque: "ford", carrosserie: "utilitaire", annee_modele: "2024", kilometrage: "0_20000", energie: "diesel", boite_vitesse: "automatique", nb_portes: "3", etat: "neuf", prix: "35000_plus" } },

  // ── MOTOS ────────────────────────────────────────────────────────────────────
  { id: "mot_01", title: "Yamaha MT-07 2023", category: "motos", weight: 0.04, params: { marque: "yamaha", carrosserie: "coupe", annee_modele: "2023", kilometrage: "0_20000", energie: "essence", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "10000_20000" } },
  { id: "mot_02", title: "BMW R 1250 GS 2022", category: "motos", weight: 0.04, params: { marque: "bmw", carrosserie: "coupe", annee_modele: "2022", kilometrage: "20000_60000", energie: "essence", boite_vitesse: "manuelle", nb_portes: "3", etat: "occasion", prix: "20000_35000" } },
];

/**
 * Returns a weight (0–1) representing the share of performance
 * that matches the given adparam filters across the catalogue.
 * An empty filters object means "no filter" → weight = 1.
 */
export function computeFilterWeight(
  category: string,
  filters: AdParamFilters
): number {
  const activeFilters = Object.entries(filters).filter(([, vals]) => vals.length > 0);
  if (activeFilters.length === 0) return 1;

  const scope =
    category === "all"
      ? LISTINGS
      : LISTINGS.filter((l) => l.category === category);

  const totalWeight = scope.reduce((sum, l) => sum + l.weight, 0);

  const matchingWeight = scope
    .filter((listing) =>
      activeFilters.every(([paramId, selectedValues]) => {
        const listingValue = listing.params[paramId];
        return listingValue !== undefined && selectedValues.includes(listingValue);
      })
    )
    .reduce((sum, l) => sum + l.weight, 0);

  if (totalWeight === 0) return 1;
  // Clamp between 0.02 and 1 so chart never goes completely empty
  return Math.max(0.02, matchingWeight / totalWeight);
}
