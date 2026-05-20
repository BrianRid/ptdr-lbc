"use client";
import { useState, useEffect, useRef } from "react";
import { X, Search, ChevronDown, ChevronRight } from "lucide-react";
import { AD_PARAM_DEFS, AD_PARAM_CATEGORIES, AdParamFilters } from "@/data/adparams";

interface Props {
  filters: AdParamFilters;
  onClose: () => void;
  onChange: (filters: AdParamFilters) => void;
}

function countActiveFilters(filters: AdParamFilters): number {
  return Object.values(filters).reduce((sum, vals) => sum + vals.length, 0);
}

export default function AdParamsModal({ filters, onClose, onChange }: Props) {
  const [draft, setDraft] = useState<AdParamFilters>(filters);
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(AD_PARAM_CATEGORIES)
  );
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleValue(paramId: string, value: string) {
    setDraft((prev) => {
      const current = prev[paramId] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [paramId]: next };
    });
  }

  function toggleCategory(category: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(category) ? next.delete(category) : next.add(category);
      return next;
    });
  }

  function reset() {
    setDraft({});
  }

  function apply() {
    // Strip empty arrays
    const cleaned = Object.fromEntries(
      Object.entries(draft).filter(([, vals]) => vals.length > 0)
    );
    onChange(cleaned);
    onClose();
  }

  const query = search.toLowerCase();

  const filteredDefs = AD_PARAM_DEFS.filter(
    (p) =>
      p.label.toLowerCase().includes(query) ||
      p.options.some((o) => o.label.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
  );

  const filteredCategories = AD_PARAM_CATEGORIES.filter((cat) =>
    filteredDefs.some((p) => p.category === cat)
  );

  const activeCount = countActiveFilters(draft);

  // Build active chip list
  const activeChips: { paramId: string; paramLabel: string; value: string; valueLabel: string }[] = [];
  for (const [paramId, values] of Object.entries(draft)) {
    const def = AD_PARAM_DEFS.find((p) => p.id === paramId);
    if (!def) continue;
    for (const value of values) {
      const opt = def.options.find((o) => o.value === value);
      if (opt) activeChips.push({ paramId, paramLabel: def.label, value, valueLabel: opt.label });
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[88vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Filtrer par paramètres d'annonce</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {activeCount === 0
                ? "Sélectionnez des valeurs pour affiner les performances"
                : `${activeCount} valeur${activeCount > 1 ? "s" : ""} active${activeCount > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <span
                key={`${chip.paramId}-${chip.value}`}
                className="flex items-center gap-1.5 text-xs font-medium bg-[#3b5bdb]/10 text-[#3b5bdb] rounded-full pl-3 pr-2 py-1"
              >
                <span className="text-[#3b5bdb]/60">{chip.paramLabel} :</span>
                {chip.valueLabel}
                <button
                  onClick={() => toggleValue(chip.paramId, chip.value)}
                  className="ml-0.5 hover:text-[#3b5bdb] opacity-60 hover:opacity-100"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un paramètre ou une valeur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 focus:border-[#3b5bdb] placeholder-slate-400"
              autoFocus
            />
          </div>
        </div>

        {/* Param list */}
        <div className="overflow-y-auto flex-1 py-2">
          {filteredCategories.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-10">
              Aucun résultat pour « {search} »
            </p>
          )}

          {filteredCategories.map((category) => {
            const params = filteredDefs.filter((p) => p.category === category);
            const isOpen = openCategories.has(category);
            const categoryActiveCount = params.reduce(
              (sum, p) => sum + (draft[p.id]?.length ?? 0),
              0
            );

            return (
              <div key={category} className="border-b border-slate-50 last:border-0">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    {isOpen
                      ? <ChevronDown size={14} className="text-slate-400" />
                      : <ChevronRight size={14} className="text-slate-400" />
                    }
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {category}
                    </span>
                    {categoryActiveCount > 0 && (
                      <span className="text-xs font-semibold text-white bg-[#3b5bdb] rounded-full px-2 py-0.5 leading-none">
                        {categoryActiveCount}
                      </span>
                    )}
                  </div>
                </button>

                {/* Params inside category */}
                {isOpen && (
                  <div className="pb-2">
                    {params.map((param) => {
                      const selectedValues = draft[param.id] ?? [];
                      return (
                        <div key={param.id} className="px-6 py-2">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-medium text-slate-700">{param.label}</p>
                            {param.required && (
                              <span className="text-xs text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5 leading-none">
                                Requis
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 pl-1">
                            {param.options.map((opt) => {
                              const active = selectedValues.includes(opt.value);
                              return (
                                <button
                                  key={opt.value}
                                  onClick={() => toggleValue(param.id, opt.value)}
                                  className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-all ${
                                    active
                                      ? "bg-[#3b5bdb] text-white border-[#3b5bdb] shadow-sm"
                                      : "bg-white text-slate-600 border-slate-200 hover:border-[#3b5bdb] hover:text-[#3b5bdb]"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <button
            onClick={reset}
            disabled={activeCount === 0}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed underline underline-offset-2"
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
              Appliquer{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
