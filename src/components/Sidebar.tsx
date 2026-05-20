"use client";
import { useState } from "react";
import { Home, Building2, ChevronDown, ChevronUp, BarChart2, LogOut } from "lucide-react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#0f172a] text-white flex-shrink-0">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-sm font-bold tracking-wide text-white">réseau performance</span>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <Home size={16} />
          Accueil
        </a>

        <div className="mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-6 py-3 text-xs font-bold text-white bg-[#3b5bdb] hover:bg-[#3451c7] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building2 size={16} />
              <span className="truncate">MARTIN TRANSACTIONS</span>
            </div>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="bg-[#1e2d47]">
              <a href="#" className="flex items-center gap-3 pl-10 pr-6 py-3 text-sm text-white bg-[#1e3a5f] border-l-2 border-[#3b5bdb]">
                <BarChart2 size={14} />
                Performances
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <button className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
