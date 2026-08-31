import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "muted" | "gold" | "teal";
};

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default:
    "bg-violet-500/15 text-violet-300 border border-violet-500/30 hover:border-violet-400 hover:bg-violet-500/25 shadow-sm",
  accent:
    "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 hover:border-fuchsia-400 hover:bg-fuchsia-500/25 shadow-sm",
  muted:
    "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:border-slate-500 hover:bg-slate-800/90",
  gold:
    "bg-slate-800/80 text-slate-200 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 shadow-sm",
  teal:
    "bg-teal-500/15 text-teal-300 border border-teal-500/30 hover:border-teal-400 hover:bg-teal-500/25 shadow-sm",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
