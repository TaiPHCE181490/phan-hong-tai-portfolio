import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "muted";
};

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default:
    "bg-violet-100/70 text-violet-700 ring-1 ring-violet-200/80 hover:bg-violet-100",
  accent:
    "bg-fuchsia-100/70 text-fuchsia-700 ring-1 ring-fuchsia-200/80 hover:bg-fuchsia-100",
  muted:
    "bg-slate-100/70 text-slate-600 ring-1 ring-slate-200/80 hover:bg-slate-100",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
