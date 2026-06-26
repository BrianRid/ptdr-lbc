"use client";
import { useState } from "react";
import { Bot, ArrowUp, MapPin, Coins, Zap, Package } from "lucide-react";
import { ASSISTANT_SUGGESTIONS, ASSISTANT_PLACEHOLDER } from "@/data/dashboardData";

const CHIP_ICONS = [MapPin, Coins, Zap, Package];

export default function AssistantBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="rounded-card p-3 bg-[linear-gradient(100deg,#141b3d_0%,#27246a_55%,#3c2f80_100%)] flex flex-col xl:flex-row xl:items-center gap-3">
      <div className="flex items-center gap-2 flex-shrink-0 pl-1">
        <span className="w-7 h-7 rounded-thumb bg-white/15 flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </span>
        <span className="t-caption font-bold uppercase tracking-wider text-white/80 whitespace-nowrap">
          Assistant IA
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
        {ASSISTANT_SUGGESTIONS.map((s, i) => {
          const Icon = CHIP_ICONS[i] ?? MapPin;
          return (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white/85 rounded-full px-3 py-1.5 t-caption font-medium transition-colors whitespace-nowrap"
            >
              <Icon size={12} className="text-white/60" />
              {s}
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 min-w-[220px]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ASSISTANT_PLACEHOLDER}
          className="w-full pl-4 pr-12 py-2.5 t-body-md text-white bg-white/10 rounded-full border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/45"
        />
        <button
          aria-label="Envoyer"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary hover:bg-primary-strong text-white rounded-full transition-colors"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
