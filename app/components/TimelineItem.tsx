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
    <div className="group relative">
      <div
        className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2.25rem] bg-violet-100/60"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(167,139,250,0.18)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
              {title}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">{role}</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-500">
            {period}
          </span>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
          {details.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
