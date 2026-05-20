"use client";
import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { AD_PARAMS, AD_PARAM_CATEGORIES } from "@/data/adparams";

interface Props {
  selected: string[];
  onClose: () => void;
  onChange: (ids: string[]) => void;
}

export default function AdParamsModal({ selected, onClose, onChange }: Props) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [search, setSearch] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleParam(id: string) {
    setDraft((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function toggleCategory(category: string) {
    const ids = AD_PARAMS.filter((p) => p.category === category).map((p) => p.id);
    const allSelected = ids.every((id) => draft.includes(id));
    if (allSelected) {
      setDraft((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setDraft((prev) => [...new Set([...prev, ...ids])]);
    }
  }

  function categoryState(category: string): "none" | "some" | "all" {
    const ids = AD_PARAMS.filter((p) => p.category === category).map((p) => p.id);
    const count = ids.filter((id) => draft.includes(id)).length;
    if (count === 0) return "none";
    if (count === ids.length) return "all";
    return "some";
  }

  function apply() {
    onChange(draft);
    onClose();
  }

  function reset() {
    setDraft([]);
  }

  const query = search.toLowerCase();
  const filteredCategories = AD_PARAM_CATEGORIES.filter((cat) =>
    AD_PARAMS.some(
      (p) => p.category === cat && p.label.toLowerCase().includes(query)
    )
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Filtrer par paramètres d'annonce</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {draft.length === 0 ? "Aucun filtre sélectionné" : `${draft.length} paramètre${draft.length > 1 ? "s" : ""} sélectionné${draft.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un paramètre…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 focus:border-[#3b5bdb] placeholder-slate-400"
            />
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[180px_1fr_100px] px-6 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span>Catégorie</span>
          <span>Intitulé du champ</span>
          <span className="text-right">Obligatoire</span>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-1">
          {filteredCategories.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-10">Aucun résultat pour « {search} »</p>
          )}
          {filteredCategories.map((category) => {
            const params = AD_PARAMS.filter(
              (p) => p.category === category && p.label.toLowerCase().includes(query)
            );
            const state = categoryState(category);

            return (
              <div key={category}>
                {/* Category row */}
                <label className="grid grid-cols-[180px_1fr_100px] items-center px-6 py-3 bg-slate-50/60 border-b border-slate-100 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={state === "all"}
                      ref={(el) => { if (el) el.indeterminate = state === "some"; }}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#3b5bdb] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{category}</span>
                  </div>
                  <span />
                  <span />
                </label>

                {/* Param rows */}
                {params.map((param) => (
                  <label
                    key={param.id}
                    className="grid grid-cols-[180px_1fr_100px] items-center px-6 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 pl-6">
                      <input
                        type="checkbox"
                        checked={draft.includes(param.id)}
                        onChange={() => toggleParam(param.id)}
                        className="w-4 h-4 rounded border-slate-300 accent-[#3b5bdb] cursor-pointer flex-shrink-0"
                      />
                    </div>
                    <span className="text-sm text-slate-700">{param.label}</span>
                    <div className="flex justify-end">
                      {param.required && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          Oui
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <button
            onClick={reset}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-2"
          >
            Réinitialiser
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={apply}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#3b5bdb] rounded-lg hover:bg-[#3451c7] transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
