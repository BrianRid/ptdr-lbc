"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, ArrowUp, ArrowRight, X, Sparkles, MapPin, Coins, Zap, Package } from "lucide-react";
import { ASSISTANT_SUGGESTIONS, ASSISTANT_PLACEHOLDER } from "@/data/dashboardData";

const CHIP_ICONS = [MapPin, Coins, Zap, Package];

interface Answer {
  title: string;
  body: string;
  action: string;
}

// Réponses simulées selon le sujet de la question.
function simulateAnswer(q: string): Answer {
  const s = q.toLowerCase();
  if (s.includes("tesla") || s.includes("model 3")) {
    return {
      title: "3 filiales sans stock de Tesla Model 3",
      body: "Bordeaux Berges, Nantes Atlantis et Strasbourg Est n'ont aucun Model 3 en ligne alors que la demande progresse de +45% cette semaine. Réaffecter 2–3 véhicules depuis Paris 15 capterait des leads non servis.",
      action: "Voir les filiales concernées",
    };
  }
  if (s.includes("prix") || s.includes("position") || s.includes("marché") || s.includes("zdc")) {
    return {
      title: "Positionnement prix : +2 pts vs marché",
      body: "Votre réseau est aligné à 81/100 sur la zone de chalandise. 4 filiales — dont Marseille Prado — publient au-dessus du marché : réviser ces prix pourrait générer ~+18 leads / semaine.",
      action: "Ouvrir l'analyse prix",
    };
  }
  if (s.includes("réactivité") || s.includes("reactivite") || s.includes("2h") || s.includes("lead")) {
    return {
      title: "Réactivité leads à surveiller",
      body: "Lille Centre Autos et Strasbourg Est répondent en moyenne en 4h20. Les leads contactés après 2h convertissent 3× moins. Activer les réponses automatiques le week-end est recommandé.",
      action: "Configurer les réponses auto",
    };
  }
  if (s.includes("tendance") || s.includes("produit") || s.includes("vend") || s.includes("modèle")) {
    return {
      title: "Modèles en tendance cette semaine",
      body: "Tesla Model 3 (+45%), Renault Clio (+12%) et Peugeot 208 (+8%) tirent la demande. Prioriser leur mise en avant sur les filiales qui en disposent maximise les leads.",
      action: "Voir les modèles tendance",
    };
  }
  return {
    title: "Synthèse réseau",
    body: "Sur vos 12 filiales : ROI global 74/100 (+4 pts). Principaux leviers — réactivité leads (62/100) et coût par lead de Marseille Prado (6,40 €). Précisez une filiale ou un indicateur pour aller plus loin.",
    action: "Voir le détail réseau",
  };
}

export default function AssistantBar() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function submit(raw: string) {
    const q = raw.trim();
    if (!q) return;
    setActiveQuery(q);
    setAnswer(null);
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setAnswer(simulateAnswer(q));
      setLoading(false);
    }, 800);
  }

  function close() {
    setActiveQuery(null);
    setAnswer(null);
    setLoading(false);
    if (timer.current) clearTimeout(timer.current);
  }

  return (
    <div className="flex flex-col gap-3">
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
                onClick={() => { setQuery(s); submit(s); }}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white/85 rounded-full px-3 py-1.5 t-caption font-medium transition-colors whitespace-nowrap"
              >
                <Icon size={12} className="text-white/60" />
                {s}
              </button>
            );
          })}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(query); }} className="relative flex-1 min-w-[220px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ASSISTANT_PLACEHOLDER}
            className="w-full pl-4 pr-12 py-2.5 t-body-md text-white bg-white/10 rounded-full border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/45"
          />
          <button
            type="submit"
            aria-label="Envoyer"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary hover:bg-primary-strong text-white rounded-full transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </form>
      </div>

      {/* Réponse simulée */}
      {activeQuery && (
        <div className="bg-surface rounded-card shadow-card border border-border-base p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-thumb bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="text-primary" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="t-caption text-ink-muted truncate">
                  Question · «&nbsp;{activeQuery}&nbsp;»
                </p>
                <button onClick={close} aria-label="Fermer" className="text-ink-muted hover:text-ink transition-colors flex-shrink-0">
                  <X size={16} />
                </button>
              </div>

              {loading ? (
                <div className="flex items-center gap-2 mt-2 t-body-md text-ink-secondary">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  </span>
                  L&apos;assistant analyse votre réseau…
                </div>
              ) : answer ? (
                <>
                  <div className="flex items-center gap-1.5 mt-1.5 mb-1">
                    <Sparkles size={13} className="text-primary" />
                    <span className="t-caption font-bold uppercase tracking-wider text-primary">Recommandation</span>
                  </div>
                  <p className="t-label-md font-bold text-ink">{answer.title}</p>
                  <p className="t-body-md text-ink-secondary mt-1">{answer.body}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full t-label-md font-semibold text-white bg-primary hover:bg-primary-strong transition-colors">
                    {answer.action} <ArrowRight size={14} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
