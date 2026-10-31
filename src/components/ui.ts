/** Shared Tailwind class strings for the Paper look. */
export const card =
  "rounded-sm border-[1.5px] border-[#1D1A16] bg-[#FFFDF8] p-4 shadow-[6px_6px_0_#1D1A16] sm:p-6";

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5442F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2]";

export const btnPrimary = `rounded-sm bg-[#E5442F] px-5 py-2.5 font-serif text-[17px] text-white transition hover:bg-[#C93724] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;

export const btnGhost = `rounded-sm border-[1.5px] border-[#E5442F] bg-transparent px-3.5 py-1.5 font-serif text-[13px] text-[#E5442F] transition hover:bg-[#E5442F]/10 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;

export const field = `w-full rounded-sm border border-[#1D1A16]/40 bg-[#FFFDF8] px-3.5 py-2.5 text-[13px] text-[#1D1A16] placeholder:text-stone-500 focus:border-[#E5442F] focus:outline-none focus:ring-2 focus:ring-[#E5442F]/25 disabled:cursor-not-allowed disabled:opacity-50`;

export const sectionHeading =
  "mb-3 flex items-center gap-2 font-serif text-2xl font-normal tracking-tight text-[#1D1A16]";

export const eyebrow =
  "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D1A16]";

export const kbd =
  "rounded-sm border border-white/50 px-1.5 font-mono text-[10px] font-medium text-current opacity-80";
