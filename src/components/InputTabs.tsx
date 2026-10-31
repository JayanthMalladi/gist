"use client";

import { useRef } from "react";

type Tab = "dictate" | "record" | "upload";

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "dictate", label: "Dictate" },
  { id: "record", label: "Record" },
  { id: "upload", label: "Upload" },
];

/**
 * Tab bar for the input section. Children (panel content) are rendered by the
 * parent — this is only the bar. Keyboard: Left/Right move+activate,
 * Home/End jump.
 */
export default function InputTabs({ active, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const activate = (tab: Tab) => {
    onChange(tab);
    refs.current[TABS.findIndex((t) => t.id === tab)]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = TABS.findIndex((t) => t.id === active);
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        activate(TABS[(idx + TABS.length - 1) % TABS.length].id);
        break;
      case "ArrowRight":
        e.preventDefault();
        activate(TABS[(idx + 1) % TABS.length].id);
        break;
      case "Home":
        e.preventDefault();
        activate(TABS[0].id);
        break;
      case "End":
        e.preventDefault();
        activate(TABS[TABS.length - 1].id);
        break;
    }
  };

  return (
    <div role="tablist" aria-label="Input source" className="mb-4 flex w-max max-w-full gap-5 border-b border-[#1D1A16]/25" onKeyDown={onKeyDown}>
      {TABS.map((tab, i) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`px-0.5 py-1.5 text-[12px] uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5442F]/60 ${
              isActive ? "-mb-px border-b-2 border-[#E5442F] text-[#E5442F]" : "text-stone-500 hover:text-[#1D1A16]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
