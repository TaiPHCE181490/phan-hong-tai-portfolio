import {
  awards,
  certificates,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./data/portfolio";
import { Badge } from "./components/Badge";
import { ProjectCard } from "./components/ProjectCard";
import { SectionHeading } from "./components/SectionHeading";
import { SkillCard } from "./components/SkillCard";
import { TimelineItem } from "./components/TimelineItem";

const stats = [
  { label: "Projects", value: `${projects.length}` },
  { label: "Skill groups", value: `${skills.length}` },
  { label: "Experience", value: `${experience.length}` },
  { label: "Awards", value: `${awards.length}` },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 selection:bg-violet-100 selection:text-violet-900">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white shadow-sm shadow-violet-200/70">
              PHT
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {profile.name}
            </div>
          </div>
          <nav
            className="hidden items-center gap-6 rounded-full border border-slate-200 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm md:flex"
            aria-label="Main navigation"
          >
            {[
              "Home",
              "Projects",
              "About",
              "Experience",
              "Skills",
              "Education",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                className="transition-colors hover:text-violet-600"
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            className="hidden rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-sm shadow-violet-200/80 transition hover:bg-violet-500 md:inline-flex"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
        <section className="relative overflow-hidden rounded-[2.75rem] bg-white/90 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/5 md:p-14">
          <div className="pointer-events-none absolute -left-28 -top-28 h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-[100px]" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-[520px] w-[520px] rounded-full bg-fuchsia-200/40 blur-[100px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-500">
                  <span className="rounded-full bg-violet-100/80 px-3 py-1 text-[10px] font-bold text-violet-700 ring-1 ring-violet-200/80">
                    {profile.location}
                  </span>
                  <span
                    className="h-1 w-1 rounded-full bg-violet-300"
                    aria-hidden="true"
                  />
                  <span>Studio Portfolio</span>
                </div>
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                  {profile.name}
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                  {profile.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {profile.techBadges.map((badge) => (
                  <Badge key={badge} tone="muted">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/80 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  View Projects
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-600"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="relative rounded-[2.25rem] bg-slate-50 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
                <div className="absolute -right-6 top-6 rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-violet-700 ring-1 ring-violet-200/80">
                  {profile.role}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                    <span className="text-3xl font-semibold text-slate-700">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Featured
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {projects[0]?.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {projects[0]?.type}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {projects[0]?.highlights.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mt-24 scroll-mt-28 space-y-10">
          <SectionHeading
            eyebrow="Projects"
            title="Gallery of selected work"
            subtitle="A studio-style wall of systems, marketplaces, and platforms."
          />
          <div className="gallery-wall">
            {projects.map((project) => (
              <div key={project.name} className="gallery-tile">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mt-24 scroll-mt-28 space-y-10">
          <SectionHeading
            eyebrow="About"
            title="Studio biography"
            subtitle={profile.summary}
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-violet-100 via-white to-fuchsia-50 p-6">
                <div className="flex h-full items-end justify-center rounded-[1.75rem] bg-white/80 shadow-inner ring-1 ring-white">
                  <span className="mb-10 text-6xl font-semibold text-violet-400">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Location
                  </span>
                  <br />
                  {profile.location}
                </p>
                <p>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Email
                  </span>
                  <br />
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="rounded-[2.5rem] bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Statement
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {profile.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="mt-24 scroll-mt-28 space-y-10">
          <SectionHeading
            eyebrow="Experience"
            title="Collaboration timeline"
            subtitle="Roles, responsibilities, and teamwork highlights."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {experience.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section id="skills" className="mt-24 scroll-mt-28 space-y-10">
          <SectionHeading
            eyebrow="Skills"
            title="Studio capabilities"
            subtitle="Backend systems, modern frontend tools, and pragmatic engineering practices."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <SkillCard key={group.category} group={group} />
            ))}
          </div>
        </section>

        <section id="education" className="mt-24 scroll-mt-28 space-y-10">
          <SectionHeading
            eyebrow="Education"
            title="FPT University - Can Tho Campus"
            subtitle="Formal training focused on software engineering fundamentals."
          />
          <div className="rounded-[2.25rem] bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {education.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {education.school}
                </p>
              </div>
              <Badge tone="accent">{education.period}</Badge>
            </div>
            <div className="mt-6 text-sm font-semibold text-slate-500">
              GPA: <span className="text-violet-600">{education.gpa}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {education.coursework.map((item) => (
                <Badge key={item} tone="muted">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Awards"
              title="Recognition"
              subtitle="Academic highlights and achievements."
            />
            <div className="rounded-[2.25rem] bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <ul className="space-y-4 text-sm font-medium leading-relaxed text-slate-600">
                {awards.map((award) => (
                  <li key={award} className="flex items-start gap-4">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Certificates"
              title="Continuous learning"
              subtitle="Credentials that reinforce practical skills."
            />
            <div className="rounded-[2.25rem] bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <ul className="space-y-4 text-sm font-medium leading-relaxed text-slate-600">
                {certificates.map((certificate) => (
                  <li key={certificate} className="flex items-start gap-4">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                    <span>{certificate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-24 scroll-mt-28 pb-10">
          <div className="relative overflow-hidden rounded-[3rem] bg-white/90 p-10 shadow-[0_22px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/5 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-[100px]" />

            <div className="relative z-10 w-full max-w-2xl">
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something elegant"
                subtitle="Open to internship and junior developer opportunities. Reach out anytime."
              />

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/80 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  Email Me
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-600"
                >
                  GitHub
                </a>
                <span className="ml-2 hidden text-sm font-medium text-slate-500 sm:block">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="font-bold text-slate-900">{profile.name}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-violet-600"
              >
                GitHub
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-violet-600"
              >
                {profile.email}
              </a>
            </div>
          </div>
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Phan Hong Tai. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
