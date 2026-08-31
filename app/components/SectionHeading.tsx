import { Sparkles } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-slate-300" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="font-art-title text-4xl sm:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-300 font-light sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
