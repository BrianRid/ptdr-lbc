"use client";
import { useState } from "react";
import { Calendar, ChevronDown, Plus } from "lucide-react";
import { CATEGORIES, DATE_RANGES } from "@/data/mockData";
import { AdParamFilters } from "@/data/adparams";
import GeoFilter from "@/components/GeoFilter";
import AdParamsModal from "@/components/AdParamsModal";

interface Props {
  dateRange: string;
  category: string;
  selectedDepts: string[];
  adParamFilters: AdParamFilters;
  onDateChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onDeptsChange: (depts: string[]) => void;
  onAdParamFiltersChange: (f: AdParamFilters) => void;
}

export default function FilterBar({
  dateRange, category, selectedDepts, adParamFilters,
  onDateChange, onCategoryChange, onDeptsChange, onAdParamFiltersChange,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const activeCount = Object.values(adParamFilters).reduce((sum, v) => sum + v.length, 0);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative">
        <select
          value={dateRange}
          onChange={(e) => onDateChange(e.target.value)}
          className="appearance-none bg-white border border-slate-200 rounded-full pl-10 pr-9 py-2 text-sm text-slate-700 font-medium cursor-pointer hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20"
        >
          {DATE_RANGES.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      <div className="relative flex items-center bg-white border border-slate-200 rounded-full overflow-hidden hover:border-slate-400 transition-colors">
        <span className="pl-4 pr-2 py-2 text-sm text-slate-400 border-r border-slate-200 whitespace-nowrap pointer-events-none select-none">
          Catégorie
        </span>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-white pl-3 pr-8 py-2 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      <GeoFilter selected={selectedDepts} onChange={onDeptsChange} />

      <button
        onClick={() => setModalOpen(true)}
        className={`flex items-center gap-2 rounded-full pl-3 pr-4 py-2 text-sm font-medium border transition-colors focus:outline-none group ${
          activeCount > 0
            ? "bg-[#3b5bdb]/10 border-[#3b5bdb] text-[#3b5bdb]"
            : "bg-white border-slate-200 text-slate-600 hover:border-[#3b5bdb] hover:text-[#3b5bdb]"
        }`}
      >
        <Plus size={14} className={activeCount > 0 ? "text-[#3b5bdb]" : "text-slate-400 group-hover:text-[#3b5bdb] transition-colors"} />
        {activeCount > 0 ? `Adparams (${activeCount})` : "Adparams"}
      </button>

      {modalOpen && (
        <AdParamsModal
          filters={adParamFilters}
          onClose={() => setModalOpen(false)}
          onChange={onAdParamFiltersChange}
        />
      )}
    </div>
  );
}
