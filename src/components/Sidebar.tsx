"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2, Trophy, LineChart, Database, FileSearch, Bot,
  RefreshCw, Package, Settings,
} from "lucide-react";
import { AFFILIATES } from "@/data/affiliates";

interface NavItem {
  label: string;
  icon: typeof BarChart2;
  href?: string;
  badge?: string;
  badgeTone?: "new" | "count";
}

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Tableau de bord",
    items: [
      { label: "Performance réseau", icon: BarChart2, href: "/reseau" },
      { label: "Top / Flop filiales", icon: Trophy, href: "/top-flop" },
      { label: "ROI & scores", icon: LineChart },
    ],
  },
  {
    title: "Marché & annonces",
    items: [
      { label: "Données marché", icon: Database },
      { label: "Analyse annonces", icon: FileSearch },
      { label: "Assistant IA", icon: Bot, badge: "NEW", badgeTone: "new" },
    ],
  },
  {
    title: "Gestion",
    items: [
      { label: "Quotas & slots", icon: RefreshCw },
      { label: "Souscrire des packs", icon: Package, badge: "3", badgeTone: "count" },
      { label: "Paramètres", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-[260px] bg-sidebar text-white flex-shrink-0">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 px-5 py-5">
        <span className="w-10 h-10 rounded-thumb bg-pink flex items-center justify-center text-white font-extrabold text-sm">
          lbc
        </span>
        <span className="leading-tight">
          <span className="block t-headline-sm text-white">Pro Auto</span>
          <span className="block t-caption text-white/50">Management Suite</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {SECTIONS.map((section) => (
          <div key={section.title} className="mt-4 first:mt-2">
            <p className="px-3 pb-2 t-caption font-semibold uppercase tracking-wider text-white/40">
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = !!item.href && pathname === item.href;
              const inner = (
                <span
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-field t-body-md transition-colors ${
                    active
                      ? "bg-sidebar-active text-white font-semibold"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={17} className="flex-shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && item.badgeTone === "new" && (
                    <span className="t-caption font-bold text-primary bg-white rounded-full px-2 py-0.5 leading-none">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && item.badgeTone === "count" && (
                    <span className="t-caption font-bold text-white bg-primary rounded-full px-2 py-0.5 leading-none">
                      {item.badge}
                    </span>
                  )}
                </span>
              );
              return item.href ? (
                <Link key={item.label} href={item.href}>{inner}</Link>
              ) : (
                <button key={item.label} className="w-full text-left">{inner}</button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center t-label-md font-bold text-white">
            RG
          </span>
          <span className="leading-tight min-w-0">
            <span className="block t-label-md font-semibold text-white truncate">Réseau Gagnant</span>
            <span className="block t-caption text-white/50">Groupe · {AFFILIATES.length} filiales</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
