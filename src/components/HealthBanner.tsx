"use client";

import { useEffect, useState } from "react";
import type { HealthResponse } from "@/lib/types";

type Props = { onHealth(health: HealthResponse | null): void };

/**
 * B2: fetch /api/health on mount. Parent gets the result (to disable Build)
 * and this component renders the amber banner + grey mock badge.
 */
export default function HealthBanner({ onHealth }: Props) {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((r) => r.json())
      .then((h: HealthResponse) => {
        if (!cancelled) {
          setHealth(h);
          onHealth(h);
        }
      })
      .catch(() => {
        if (!cancelled) onHealth(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!health) return null;

  if (health.hasKey) {
    return health.mock ? (
      <span className="inline-flex w-fit text-[10px] uppercase tracking-[0.2em] text-stone-500">
        Mock mode
      </span>
    ) : null;
  }

  return (
    <div
      role="alert"
      className="flex flex-col gap-1.5 rounded-sm border border-[#E5442F] p-3 text-[13px] text-[#1D1A16]"
    >
      <span>Add GROQ_API_KEY to enable processing.</span>
    </div>
  );
}
