"use client";
import { useState, useMemo } from "react";
import { List, Eye, Heart, Mail, Phone } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import PerformanceChart from "@/components/PerformanceChart";
import FilterBar from "@/components/FilterBar";
import { MOCK_DATA, computeTotals } from "@/data/mockData";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("current_week");
  const [category, setCategory] = useState("all");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);

  const data = useMemo(() => {
    return MOCK_DATA[dateRange]?.[category] ?? MOCK_DATA["current_week"]["all"];
  }, [dateRange, category]);

  const totals = useMemo(() => computeTotals(data), [data]);

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
            onDateChange={setDateRange}
            onCategoryChange={setCategory}
            onDeptsChange={setSelectedDepts}
          />

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Performance des annonces</h2>

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
