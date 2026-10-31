"use client";

import { useEffect, useRef, useState } from "react";
import type { Segment } from "@/lib/types";
import { formatTs } from "@/lib/audio";
import { card, eyebrow } from "./ui";

type Props = {
  segments: Segment[];
  selectedSeg?: number | null; // highlighted + scrolled into view
  /** Bumped on every selection so re-selecting the same segment re-flashes. */
  selectTick?: number;
  onSelect(seg: number): void; // clicking a segment
  withAudio?: boolean; // false on share page
  /** Heading override, e.g. "Reading transcript" while generating. */
  title?: string;
  /** Muted caption beside the title. */
  caption?: string;
  /** Fill the available height instead of capping at 20rem (wide layout). */
  tall?: boolean;
};

/**
 * B10: transcript segments, keyed by numeric seg index (`data-seg={s.i}`).
 * Parent sets `selectedSeg`; the panel highlights it persistently, flashes it,
 * and scrolls it into view. On wide screens only the panel's own scroller
 * moves (the page stays put); on narrow screens the page scrolls to it.
 */
export default function TranscriptPanel({
  segments,
  selectedSeg,
  selectTick,
  onSelect,
  withAudio,
  title,
  caption,
  tall,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState<{ seg: number; tick: number } | null>(null);

  useEffect(() => {
    if (selectedSeg === null || selectedSeg === undefined || !containerRef.current) return;
    const container = containerRef.current;
    const el = container.querySelector<HTMLElement>(`[data-seg="${CSS.escape(String(selectedSeg))}"]`);
    if (!el) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const top = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
      container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setFlash({ seg: selectedSeg, tick: selectTick ?? 0 });
    const t = window.setTimeout(() => setFlash(null), 1500);
    return () => window.clearTimeout(t);
  }, [selectedSeg, selectTick]);

  // withAudio is part of the public props contract (share page hides the
  // audio-related affordances); panel body is unchanged either way.
  void withAudio;

  if (!segments.length) return null;

  return (
    <section className={`${card} !p-4 flex min-h-0 flex-col gap-2`} aria-label="Transcript">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className={`${eyebrow} font-serif !text-xl !font-normal !normal-case !tracking-tight text-[#1D1A16]`}>
          {title ?? "Transcript"}
        </h2>
        <span className="text-[11px] text-stone-500">
          {caption ?? `${segments.length} ${segments.length === 1 ? "segment" : "segments"}`}
        </span>
      </div>
      <div
        ref={containerRef}
        className={`relative -mx-1 overflow-y-auto px-1 ${
          tall ? "max-h-80 lg:max-h-[calc(100vh-15rem)]" : "max-h-80"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          {segments.map((s) => {
            const label = s.start !== undefined ? formatTs(s.start) : `¶${s.i + 1}`;
            const selected = selectedSeg === s.i;
            const flashing = flash?.seg === s.i;
            return (
              <div
                key={s.i}
                data-seg={s.i}
                data-selected={selected ? "true" : undefined}
                aria-current={selected ? "true" : undefined}
                onClick={() => onSelect(s.i)}
                className={`flex cursor-pointer gap-2 rounded-sm px-2.5 py-1.5 text-[13px] leading-relaxed transition-colors ${
                  selected
                    ? "border-l-2 border-[#E5442F] bg-[#F9DDD5] text-[#1D1A16]"
                    : "border-l-2 border-transparent text-[#1D1A16]/80 hover:bg-black/[0.03]"
                } ${flashing ? "flash" : ""}`}
              >
                <span className="min-w-8 shrink-0 pt-0.5 font-sans text-[10px] text-[#E5442F]">
                  {label}
                </span>
                <span>{s.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
