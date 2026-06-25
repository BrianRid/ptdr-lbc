"use client";
import { Download, Calendar, ChevronDown, Plus } from "lucide-react";
import { DashboardData } from "@/data/dashboardData";
import AssistantBar from "@/components/dashboard/AssistantBar";
import InsightCards from "@/components/dashboard/InsightCards";
import ScoreCards from "@/components/dashboard/ScoreCards";
import TopFlopCard from "@/components/dashboard/TopFlopCard";
import MarketCard from "@/components/dashboard/MarketCard";
import QuotaTransferCard from "@/components/dashboard/QuotaTransferCard";
import PacksCard from "@/components/dashboard/PacksCard";
import AdScoresCard from "@/components/dashboard/AdScoresCard";

interface Props {
  title: string;
  subtitle: string;
  data: DashboardData;
}

export default function NetworkDashboard({ title, subtitle, data }: Props) {
  return (
    <div className="p-8 max-w-[1320px]">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
        <div>
          <h1 className="t-headline-lg">{title}</h1>
          <p className="t-body-md text-ink-secondary mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="inline-flex items-center gap-2 bg-surface border border-border-input rounded-full px-4 py-2.5 t-label-md font-medium text-ink hover:border-ink-muted transition-colors">
            <Download size={15} /> Exporter
          </button>
          <button className="inline-flex items-center gap-2 bg-surface border border-border-input rounded-full px-4 py-2.5 t-label-md font-medium text-ink hover:border-ink-muted transition-colors">
            <Calendar size={15} /> Cette semaine <ChevronDown size={14} className="text-ink-muted" />
          </button>
          <button className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2.5 t-label-md font-semibold hover:bg-primary-strong transition-colors shadow-card">
            <Plus size={16} /> Nouvelle annonce
          </button>
        </div>
      </header>

      {/* Assistant IA */}
      <div className="mb-6">
        <AssistantBar />
      </div>

      {/* Insights IA */}
      <div className="mb-6">
        <InsightCards />
      </div>

      {/* Score cards */}
      <div className="mb-6">
        <ScoreCards scores={data.scores} />
      </div>

      {/* Top/Flop + Marché */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopFlopCard />
        <MarketCard data={data} />
      </div>

      {/* Quotas + Packs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <QuotaTransferCard />
        <PacksCard />
      </div>

      {/* Scores par annonce */}
      <AdScoresCard />
    </div>
  );
}
