import { Badge } from "./Badge";
import { ExternalLink, FolderGit2, Users, Calendar } from "lucide-react";

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
      {/* Background Ambient Glow */}
      <div
        className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-slate-700/20 via-indigo-600/20 to-slate-800/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between rounded-[2.25rem] glass-art-card p-8 text-slate-100 transition-all duration-500 group-hover:-translate-y-2">
        <div>
          {/* Header Visual Frame */}
          <div className="relative mb-6 h-36 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-700/50 p-6 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-700/20 blur-2xl group-hover:bg-indigo-600/25 transition-all duration-500" />

            <div className="relative z-10 flex items-center justify-between">
              {project.category && (
                <span className="rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200 shadow-sm">
                  {project.category}
                </span>
              )}
              <Badge tone="accent">{project.role}</Badge>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Team: {project.teamSize}
              </span>
              {project.period && (
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {project.period}
                </span>
              )}
            </div>
          </div>

          {/* Project Title & Subtitle */}
          <div className="space-y-1">
            <h3 className="font-art-title text-2xl font-bold tracking-wide text-white group-hover:text-slate-100 transition-all duration-300">
              {project.name}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {project.type}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item} tone="muted">
                {item}
              </Badge>
            ))}
          </div>

          {/* Highlights */}
          <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-slate-300">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 shadow-sm" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Repository & Demo Action Links */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            aria-label={`Open ${project.name} GitHub repository`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            <span>GitHub</span>
          </a>
          {project.extraRepoUrls?.map((repo) => (
            <a
              key={repo.label}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              aria-label={`Open ${project.name} ${repo.label} repository`}
            >
              <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{repo.label}</span>
            </a>
          ))}
          {project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105"
              aria-label={`Open ${project.name} live demo`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
