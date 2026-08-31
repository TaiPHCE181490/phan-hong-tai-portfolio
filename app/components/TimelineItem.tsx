type TimelineItemProps = {
  title: string;
  role: string;
  period: string;
  details: string[];
};

export function TimelineItem({
  title,
  role,
  period,
  details,
}: TimelineItemProps) {
  return (
    <div className="group relative h-full">
      <div
        className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-violet-600/20 via-indigo-500/20 to-fuchsia-600/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-between rounded-[2.25rem] glass-art-card p-8 text-slate-100 transition-all duration-500 group-hover:-translate-y-2">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-art-title text-2xl font-bold tracking-wide text-white group-hover:text-slate-100 transition-all duration-300">
                {title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {role}
              </p>
            </div>
            <span className="rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-300 shadow-[0_0_12px_rgba(124,58,237,0.2)]">
              {period}
            </span>
          </div>

          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-300">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_#c084fc]" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
