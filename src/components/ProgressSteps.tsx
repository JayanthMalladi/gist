export type Step = {
  label: string;
  status: "done" | "run" | "wait";
  /** Milliseconds spent (done) or so far (run). */
  ms?: number;
};

function fmt(ms?: number): string {
  if (ms === undefined) return "–";
  if (ms < 100) return "<0.1s";
  return `${(ms / 1000).toFixed(1)}s`;
}

/** Step-by-step progress with per-step elapsed time (Generating state). */
export default function ProgressSteps({ steps }: { steps: Step[] }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-6 py-4">
      <div className="orb" aria-hidden />
      <ul className="flex w-full max-w-md flex-col gap-2">
        {steps.map((s, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 rounded-sm border border-[#1D1A16]/25 px-4 py-2 text-[13px]  transition ${
              s.status === "wait"
                ? "bg-[#FFFDF8] text-stone-500"
                : s.status === "run"
                  ? "bg-[#FFFDF8] text-[#1D1A16] shadow-sm"
                  : "bg-[#FFFDF8] text-[#1D1A16]"
            }`}
          >
            {s.status === "done" && (
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-[#E5442F] text-[11px] text-white" aria-hidden>
                ✓
              </span>
            )}
            {s.status === "run" && (
              <span className="h-5 w-5 shrink-0 animate-spin rounded-sm border-2 border-[#E5442F] border-t-transparent" aria-hidden />
            )}
            {s.status === "wait" && (
              <span className="h-5 w-5 shrink-0 rounded-sm border-2 border-[#1D1A16]/25" aria-hidden />
            )}
            <span className={s.status === "run" ? "font-semibold" : ""}>{s.label}</span>
            <span className="ml-auto font-mono text-[11px] text-stone-500">
              {s.status === "wait" ? "–" : fmt(s.ms)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
