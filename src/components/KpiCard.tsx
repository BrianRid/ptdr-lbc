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

export default function KpiCard({ icon, value, label, iconColor = "text-primary" }: KpiCardProps) {
  return (
    <div className="bg-surface rounded-card p-6 shadow-card flex flex-col gap-3 relative flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className={`${iconColor}`}>{icon}</span>
        <button className="text-ink-muted/60 hover:text-ink-secondary transition-colors">
          <Info size={16} />
        </button>
      </div>
      <div>
        <p className="stat-giant" suppressHydrationWarning>{formatNumber(value)}</p>
        <p className="t-caption text-ink-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}
