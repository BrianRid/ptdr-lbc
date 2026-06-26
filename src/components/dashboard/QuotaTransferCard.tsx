"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AFFILIATES } from "@/data/affiliates";

export default function QuotaTransferCard() {
  const [amount, setAmount] = useState(5);

  const sorted = [...AFFILIATES].sort((a, b) => b.adsCount - a.adsCount);
  const source = sorted[0];
  const destination = sorted[sorted.length - 1];

  return (
    <section className="bg-surface rounded-card shadow-card p-6 flex flex-col">
      <h2 className="t-headline-md">Transfert de quotas / slots</h2>
      <p className="t-caption text-ink-muted mb-4">Rééquilibrer les slots entre filiales de votre réseau</p>

      <div className="flex items-stretch gap-3">
        <div className="flex-1 border border-border-base rounded-field p-3.5">
          <p className="t-caption text-ink-muted mb-1">Source</p>
          <p className="t-label-md font-semibold text-ink truncate">{source.name}</p>
          <p className="t-caption text-primary font-medium mt-0.5">{source.adsCount} slots disponibles</p>
        </div>
        <div className="flex items-center text-ink-muted">
          <ArrowRight size={18} />
        </div>
        <div className="flex-1 border border-border-base rounded-field p-3.5">
          <p className="t-caption text-ink-muted mb-1">Destination</p>
          <p className="t-label-md font-semibold text-ink truncate">{destination.name}</p>
          <p className="t-caption text-primary font-medium mt-0.5">{destination.adsCount} slots disponibles</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 px-3 py-2.5 t-body-md text-ink text-center border border-border-input rounded-field focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <span className="t-body-md text-ink-secondary">slots à transférer</span>
      </div>

      <button className="mt-4 w-full py-3 t-label-md font-semibold text-white bg-primary rounded-full hover:bg-primary-strong transition-colors">
        Confirmer le transfert
      </button>
    </section>
  );
}
