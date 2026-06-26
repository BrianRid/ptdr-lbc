"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Trophy } from "lucide-react";
import { AFFILIATES } from "@/data/affiliates";

const NAV = [
  { label: "Performance réseau", icon: BarChart2, href: "/reseau" },
  { label: "Liste de mes filiales", icon: Trophy, href: "/top-flop" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-[260px] bg-sidebar text-white flex-shrink-0">
      {/* Brand */}
      <Link href="/reseau" className="flex items-center gap-3 px-5 py-5">
        <span className="w-10 h-10 rounded-thumb bg-pink flex items-center justify-center text-white font-extrabold text-sm">
          lbc
        </span>
        <span className="leading-tight">
          <span className="block t-headline-sm text-white">Pro Auto</span>
          <span className="block t-caption text-white/50">Management Suite</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-2 pb-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href === "/top-flop" && pathname.startsWith("/filiale"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-field t-body-md transition-colors ${
                active ? "bg-sidebar-active text-white font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
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
