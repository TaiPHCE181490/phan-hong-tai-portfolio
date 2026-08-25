import { Badge } from "./Badge";

type ExtraRepo = {
  label: string;
  url: string;
};

type Project = {
  name: string;
  type: string;
  role: string;
  teamSize: string;
  stack: string[];
  highlights: string[];
  repoUrl: string;
  demoUrl: string;
  extraRepoUrls?: ExtraRepo[];
  period?: string;
  category?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative h-full">
      <div
        className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2.25rem] bg-violet-100/60"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col rounded-[2.25rem] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(167,139,250,0.18)]">
        <div className="mb-6 h-32 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-white to-fuchsia-100">
          {project.category && (
            <div className="flex h-full items-center justify-center">
              <span className="rounded-full bg-violet-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700">
                {project.category}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {project.type}
            </p>
          </div>
          <Badge tone="accent">{project.role}</Badge>
        </div>

        <div className="mt-4 space-y-1 text-sm font-medium text-slate-500">
          <div>Team size: <span className="text-slate-700">{project.teamSize}</span></div>
          {project.period && (
            <div>Period: <span className="text-violet-600 font-semibold">{project.period}</span></div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <Badge key={item} tone="muted">
              {item}
            </Badge>
          ))}
        </div>

        <ul className="mt-7 space-y-3 text-sm leading-relaxed text-slate-600">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 pt-2 border-t border-slate-100">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-200"
            aria-label={`Open ${project.name} GitHub repository`}
          >
            GitHub
          </a>
          {project.extraRepoUrls?.map((repo) => (
            <a
              key={repo.label}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-200"
              aria-label={`Open ${project.name} ${repo.label} repository`}
            >
              {repo.label}
            </a>
          ))}
          {project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-violet-200/80 transition hover:-translate-y-0.5 hover:bg-violet-500"
              aria-label={`Open ${project.name} live demo`}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
