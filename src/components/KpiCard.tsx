import { Info } from "lucide-react";
import { ReactNode } from "react";

interface KpiCardProps {
  icon: ReactNode;
  value: number;
  label: string;
  iconColor?: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function KpiCard({ icon, value, label, iconColor = "text-[#0d9488]" }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 relative flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className={`${iconColor} text-xl`}>{icon}</span>
        <button className="text-slate-300 hover:text-slate-500 transition-colors">
          <Info size={16} />
        </button>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 tabular-nums" suppressHydrationWarning>{formatNumber(value)}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
