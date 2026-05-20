export interface AdParam {
  id: string;
  category: string;
  label: string;
  required: boolean;
}

export const AD_PARAMS: AdParam[] = [
  // IMMOBILIER
  { id: "immo_charges", category: "IMMOBILIER", label: "Charges locatives", required: true },
  { id: "immo_surface_hab", category: "IMMOBILIER", label: "Surface habitable", required: true },
  { id: "immo_chambres", category: "IMMOBILIER", label: "Nombre de chambres", required: true },
  { id: "immo_classe_energie", category: "IMMOBILIER", label: "Classe énergie", required: true },
  { id: "immo_ges", category: "IMMOBILIER", label: "GES", required: true },
  { id: "immo_encadrement", category: "IMMOBILIER", label: "Votre bien est-il en zone soumise à l'encadrement des loyers ?", required: true },
  { id: "immo_type_bien", category: "IMMOBILIER", label: "Choisissez votre type de bien", required: true },
  { id: "immo_loyer_ref", category: "IMMOBILIER", label: "Loyer de référence majoré", required: true },
  { id: "immo_pieces", category: "IMMOBILIER", label: "Nombre de pièces", required: true },
  { id: "immo_surface_terrain", category: "IMMOBILIER", label: "Surface totale du terrain", required: true },
  { id: "immo_etage", category: "IMMOBILIER", label: "Étage", required: false },
  { id: "immo_ascenseur", category: "IMMOBILIER", label: "Ascenseur", required: false },
  { id: "immo_parking", category: "IMMOBILIER", label: "Parking / Garage", required: false },
  { id: "immo_meuble", category: "IMMOBILIER", label: "Meublé", required: false },

  // VÉHICULES
  { id: "veh_kilometrage", category: "VÉHICULES", label: "Kilométrage", required: true },
  { id: "veh_annee", category: "VÉHICULES", label: "Année modèle", required: true },
  { id: "veh_marque", category: "VÉHICULES", label: "Marque", required: true },
  { id: "veh_modele", category: "VÉHICULES", label: "Modèle", required: true },
  { id: "veh_energie", category: "VÉHICULES", label: "Énergie", required: true },
  { id: "veh_boite", category: "VÉHICULES", label: "Boîte de vitesse", required: true },
  { id: "veh_immat", category: "VÉHICULES", label: "Numéro d'immatriculation", required: true },
  { id: "veh_quantite", category: "VÉHICULES", label: "Quantité", required: true },
  { id: "veh_couleur", category: "VÉHICULES", label: "Couleur", required: false },
  { id: "veh_nb_portes", category: "VÉHICULES", label: "Nombre de portes", required: false },
  { id: "veh_puissance", category: "VÉHICULES", label: "Puissance fiscale", required: false },

  // EMPLOI
  { id: "emp_contrat", category: "EMPLOI", label: "Type de contrat", required: true },
  { id: "emp_experience", category: "EMPLOI", label: "Expérience requise", required: true },
  { id: "emp_salaire", category: "EMPLOI", label: "Salaire", required: false },
  { id: "emp_teletravail", category: "EMPLOI", label: "Télétravail", required: false },
  { id: "emp_secteur", category: "EMPLOI", label: "Secteur d'activité", required: true },
  { id: "emp_poste", category: "EMPLOI", label: "Intitulé du poste", required: true },

  // SERVICES
  { id: "svc_type", category: "SERVICES", label: "Type de prestation", required: true },
  { id: "svc_deplacement", category: "SERVICES", label: "Déplacement possible", required: false },
  { id: "svc_disponibilite", category: "SERVICES", label: "Disponibilité", required: false },
  { id: "svc_tarif", category: "SERVICES", label: "Tarif horaire", required: false },

  // MULTIMÉDIA
  { id: "multi_etat", category: "MULTIMÉDIA", label: "État de l'article", required: true },
  { id: "multi_marque", category: "MULTIMÉDIA", label: "Marque", required: true },
  { id: "multi_modele", category: "MULTIMÉDIA", label: "Modèle", required: false },
  { id: "multi_capacite", category: "MULTIMÉDIA", label: "Capacité de stockage", required: false },
];

export const AD_PARAM_CATEGORIES = [...new Set(AD_PARAMS.map((p) => p.category))];
