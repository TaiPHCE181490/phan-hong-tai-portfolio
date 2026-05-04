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
    <div className="space-y-4">
      {eyebrow ? (
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500">
          <span
            className="h-1.5 w-1.5 rounded-full bg-violet-400"
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
