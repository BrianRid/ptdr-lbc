"use client";
import { useState } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { ASSISTANT_SUGGESTIONS, ASSISTANT_PLACEHOLDER } from "@/data/dashboardData";

export default function AssistantCard() {
  const [query, setQuery] = useState("");

  return (
    <section className="bg-surface rounded-card shadow-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="t-headline-md">Assistant analyse</h2>
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 t-caption font-bold">
          <Sparkles size={11} /> IA
        </span>
      </div>
      <p className="t-caption text-ink-muted mb-4">
        Croisez vos données à la volée · posez n&apos;importe quelle question sur votre réseau
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {ASSISTANT_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="bg-app text-ink-secondary hover:text-ink hover:bg-surface-alt border border-border-base rounded-full px-3.5 py-2 t-label-md transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ASSISTANT_PLACEHOLDER}
          className="w-full pl-4 pr-14 py-3.5 t-body-md text-ink border border-border-input rounded-field focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-ink-muted"
        />
        <button
          aria-label="Envoyer"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-field hover:bg-primary-strong transition-colors"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </section>
  );
}
