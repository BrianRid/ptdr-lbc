"use client";
import { useState, useMemo } from "react";
import { List, Eye, Heart, Mail, Phone } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import PerformanceChart from "@/components/PerformanceChart";
import FilterBar from "@/components/FilterBar";
import { MOCK_DATA, computeTotals, DailyData } from "@/data/mockData";
import { AdParamFilters } from "@/data/adparams";
import { computeFilterWeight } from "@/data/listings";

function applyWeight(data: DailyData[], weight: number): DailyData[] {
  if (weight === 1) return data;
  return data.map((d) => ({
    ...d,
    apparitions: Math.round(d.apparitions * weight),
    clics: Math.round(d.clics * weight),
    favoris: Math.round(d.favoris * weight),
    messages: Math.round(d.messages * weight),
    appels: Math.round(d.appels * weight),
  }));
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("current_week");
  const [category, setCategory] = useState("all");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [adParamFilters, setAdParamFilters] = useState<AdParamFilters>({});

  const baseData = useMemo(
    () => MOCK_DATA[dateRange]?.[category] ?? MOCK_DATA["current_week"]["all"],
    [dateRange, category]
  );

  const data = useMemo(() => {
    const weight = computeFilterWeight(category, adParamFilters);
    return applyWeight(baseData, weight);
  }, [baseData, category, adParamFilters]);

  const totals = useMemo(() => computeTotals(data), [data]);

  const hasAdParamFilters = Object.values(adParamFilters).some((v) => v.length > 0);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Tous les établissements — MARTIN TRANSACTIONS
          </h1>

          <FilterBar
            dateRange={dateRange}
            category={category}
            selectedDepts={selectedDepts}
            adParamFilters={adParamFilters}
            onDateChange={setDateRange}
            onCategoryChange={setCategory}
            onDeptsChange={setSelectedDepts}
            onAdParamFiltersChange={setAdParamFilters}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Performance des annonces</h2>
              {hasAdParamFilters && (
                <span className="text-xs font-medium text-[#3b5bdb] bg-[#3b5bdb]/10 px-2.5 py-1 rounded-full">
                  Données filtrées par adparams
                </span>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <KpiCard icon={<List size={22} />} value={totals.apparitions} label="Total apparitions" />
              <KpiCard icon={<Eye size={22} />} value={totals.clics} label="Total clics annonces" />
              <KpiCard icon={<Heart size={22} />} value={totals.favoris} label="Total favoris" />
              <KpiCard icon={<Mail size={22} />} value={totals.messages} label="Total messages reçus" />
              <KpiCard icon={<Phone size={22} />} value={totals.appels} label="Total intentions appel" />
            </div>

            <PerformanceChart data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
