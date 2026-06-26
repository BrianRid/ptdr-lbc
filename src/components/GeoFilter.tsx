"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { REGIONS } from "@/data/mockData";

interface Props {
  selected: string[];
  onChange: (depts: string[]) => void;
}

function buildLabel(selected: string[]): string {
  if (selected.length === 0) return "Zone géographique (Toutes)";

  const fullRegionNames: string[] = [];
  let remaining = [...selected];

  for (const [, region] of Object.entries(REGIONS)) {
    const codes = region.departments.map((d) => d.code);
    if (codes.every((c) => selected.includes(c))) {
      fullRegionNames.push(region.name);
      remaining = remaining.filter((c) => !codes.includes(c));
    }
  }

  if (fullRegionNames.length === 1 && remaining.length === 0) {
    return `Zone géographique (${fullRegionNames[0]})`;
  }
  if (fullRegionNames.length > 1 && remaining.length === 0) {
    return `Zone géographique (${fullRegionNames.length} régions)`;
  }
  return `Zone géographique (${selected.length} dept.)`;
}

export default function GeoFilter({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(selected);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDraft(selected);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  useEffect(() => {
    if (!open) setDraft(selected);
  }, [selected, open]);

  function toggleDept(code: string) {
    setDraft((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  function toggleRegion(regionCode: string) {
    const codes = REGIONS[regionCode].departments.map((d) => d.code);
    const allSelected = codes.every((c) => draft.includes(c));
    if (allSelected) {
      setDraft((prev) => prev.filter((c) => !codes.includes(c)));
    } else {
      setDraft((prev) => [...new Set([...prev, ...codes])]);
    }
  }

  function regionState(regionCode: string): "none" | "some" | "all" {
    const codes = REGIONS[regionCode].departments.map((d) => d.code);
    const count = codes.filter((c) => draft.includes(c)).length;
    if (count === 0) return "none";
    if (count === codes.length) return "all";
    return "some";
  }

  function applySelection() {
    onChange(draft);
    setOpen(false);
  }

  function cancelSelection() {
    setDraft(selected);
    setOpen(false);
  }

  function handleToggleOpen() {
    if (!open) setDraft(selected);
    setOpen((v) => !v);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleToggleOpen}
        className="flex items-center gap-2 bg-surface border border-border-input rounded-full pl-4 pr-3 py-2 t-label-md text-ink hover:border-ink-muted transition-colors focus:outline-none"
      >
        <span>{buildLabel(selected)}</span>
        {open ? (
          <ChevronUp size={14} className="text-ink-muted flex-shrink-0" />
        ) : (
          <ChevronDown size={14} className="text-ink-muted flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-surface border border-border-base rounded-card shadow-xl w-[440px]">
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {Object.entries(REGIONS).map(([regionCode, region]) => {
              const state = regionState(regionCode);
              return (
                <div key={regionCode} className="mb-5 last:mb-0">
                  <label className="flex items-center gap-2.5 cursor-pointer mb-2.5">
                    <input
                      type="checkbox"
                      checked={state === "all"}
                      ref={(el) => {
                        if (el) el.indeterminate = state === "some";
                      }}
                      onChange={() => toggleRegion(regionCode)}
                      className="w-4 h-4 rounded border-border-input accent-primary cursor-pointer"
                    />
                    <span className="t-body-md font-semibold text-ink">
                      {region.name}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-6">
                    {region.departments.map((dept) => (
                      <label
                        key={dept.code}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={draft.includes(dept.code)}
                          onChange={() => toggleDept(dept.code)}
                          className="w-4 h-4 rounded border-border-input accent-primary cursor-pointer flex-shrink-0"
                        />
                        <span className="t-body-md text-ink-secondary leading-tight">
                          {dept.code} - {dept.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end items-center gap-3 px-4 py-3 border-t border-border-base">
            <button
              onClick={cancelSelection}
              className="px-4 py-2 t-label-md text-ink-secondary hover:text-ink transition-colors rounded-full hover:bg-app"
            >
              Annuler
            </button>
            <button
              onClick={applySelection}
              className="px-5 py-2 t-label-md font-semibold text-white bg-primary rounded-full hover:bg-primary-strong transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
