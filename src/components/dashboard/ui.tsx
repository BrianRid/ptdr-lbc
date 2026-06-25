"use client";
import { ReactNode } from "react";
import { ArrowUp, ArrowDown, Minus, HelpCircle } from "lucide-react";
import { Tone, TrendDir } from "@/data/dashboardData";

export const TONE: Record<Tone, { text: string; bar: string; soft: string; dot: string }> = {
  blue: { text: "text-primary", bar: "bg-primary", soft: "bg-primary/10", dot: "bg-primary" },
  green: { text: "text-potential-high", bar: "bg-potential-high", soft: "bg-potential-high/15", dot: "bg-potential-high" },
  amber: { text: "text-potential-mid", bar: "bg-potential-mid", soft: "bg-potential-mid/15", dot: "bg-potential-mid" },
  gray: { text: "text-potential-low", bar: "bg-potential-low", soft: "bg-potential-low/20", dot: "bg-potential-low" },
  red: { text: "text-alert", bar: "bg-alert", soft: "bg-alert/10", dot: "bg-alert" },
};

/** Couleur sémantique d'un score /100 : ≥75 vert, ≥50 ambre, sinon rouge. */
export function scoreTone(v: number): Tone {
  return v >= 75 ? "green" : v >= 50 ? "amber" : "red";
}
/** Couleur d'un coût/lead : ≤2,5 € vert, ≤4 € ambre, sinon rouge. */
export function leadCostTone(v: number): Tone {
  return v <= 2.5 ? "green" : v <= 4 ? "amber" : "red";
}

export function TrendBadge({ dir, label }: { dir: TrendDir; label: string }) {
  const map = {
    up: { cls: "text-potential-high bg-potential-high/15", Icon: ArrowUp },
    down: { cls: "text-alert bg-alert/10", Icon: ArrowDown },
    flat: { cls: "text-ink-muted bg-app", Icon: Minus },
  }[dir];
  const Icon = map.Icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full t-caption font-semibold whitespace-nowrap ${map.cls}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

/** Petite icône "?" avec une infobulle de définition au survol / focus. */
export function InfoHint({ text }: { text: string }) {
  return (
    <span className="relative inline-flex group align-middle">
      <HelpCircle size={13} tabIndex={0} className="text-ink-muted/70 hover:text-ink-secondary focus:text-ink-secondary cursor-help outline-none" />
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-ink text-white t-caption font-normal leading-snug rounded-field p-2.5 shadow-lg"
      >
        {text}
      </span>
    </span>
  );
}

export function SignalBars({ tone }: { tone: Tone }) {
  const heights = [6, 10, 14, 18];
  return (
    <div className="flex items-end gap-0.5 h-[18px]">
      {heights.map((h, i) => (
        <span key={i} className={`w-1 rounded-sm ${TONE[tone].dot}`} style={{ height: h }} />
      ))}
    </div>
  );
}

export function SectionLink({ children }: { children: ReactNode }) {
  return (
    <button className="t-label-md font-semibold text-primary hover:text-primary-strong transition-colors whitespace-nowrap">
      {children}
    </button>
  );
}

export function boldSegments(text: string): ReactNode[] {
  return text.split("**").map((p, i) =>
    i % 2 === 1 ? <strong key={i} className="font-bold">{p}</strong> : <span key={i}>{p}</span>
  );
}
