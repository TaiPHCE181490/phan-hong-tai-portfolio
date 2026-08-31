"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { MonetVanGoghCanvas } from "./components/MonetVanGoghCanvas";
import { ImpressionistCursor } from "./components/ImpressionistCursor";
import { ImpressionistIntro } from "./components/ImpressionistIntro";
import { Artistic3DMascot } from "./components/Artistic3DMascot";
import { ProjectCrystalOrb } from "./components/ProjectCrystalOrb";
import { BioEtherSphere } from "./components/BioEtherSphere";
import { TimelineClock3D } from "./components/TimelineClock3D";
import { SkillNodeCube } from "./components/SkillNodeCube";
import { AcademicLaurel3D } from "./components/AcademicLaurel3D";
import {
  Sparkles,
  Mail,
  Award,
  GraduationCap,
  CheckCircle2,
  Compass,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const stats = [
  { label: "Completed Projects", value: `${projects.length}` },
  { label: "Core Skill Groups", value: `${skills.length}` },
  { label: "Hands-on Experience", value: `${experience.length}` },
  { label: "Awards & Credentials", value: `${awards.length + certificates.length}` },
];

export type ThemeId = "gold" | "sapphire" | "iris" | "white";

interface ThemePreset {
  id: ThemeId;
  hex: string;
  name: string;
  gradientClass: string;
  btnGradientClass: string;
  badgeTone: "gold" | "default" | "accent" | "muted";
  borderColor: string;
}

const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  gold: {
    id: "gold",
    hex: "#d4af37",
    name: "Moonlit Gold",
    gradientClass: "text-gold-gradient",
    btnGradientClass: "from-amber-500 via-amber-600 to-indigo-600 text-slate-950",
    badgeTone: "gold",
    borderColor: "rgba(212,175,55,0.4)",
  },
  sapphire: {
    id: "sapphire",
    hex: "#38bdf8",
    name: "Sapphire Blue",
    gradientClass: "text-sapphire-gradient",
    btnGradientClass: "from-sky-400 via-blue-500 to-indigo-600 text-slate-950",
    badgeTone: "default",
    borderColor: "rgba(56,189,248,0.4)",
  },
  iris: {
    id: "iris",
    hex: "#c084fc",
    name: "Iris Purple",
    gradientClass: "text-iris-gradient",
    btnGradientClass: "from-purple-400 via-fuchsia-500 to-pink-600 text-slate-950",
    badgeTone: "accent",
    borderColor: "rgba(192,132,252,0.4)",
  },
  white: {
    id: "white",
    hex: "#ffffff",
    name: "Pure White",
    gradientClass: "text-white-gradient",
    btnGradientClass: "from-slate-100 via-slate-300 to-slate-500 text-slate-950",
    badgeTone: "muted",
    borderColor: "rgba(255,255,255,0.4)",
  },
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("gold");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const mainRef = useRef<HTMLDivElement>(null);

  const activeThemeConfig = THEME_PRESETS[currentTheme];

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (showIntro) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".gsap-reveal-section");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [showIntro]);

  return (
    <div className="relative min-h-screen bg-[#080c16] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      {/* 1. Dynamic WebGL Canvas (Three.js Shader Background reacting to themeColor) */}
      <MonetVanGoghCanvas themeColor={activeThemeConfig.hex} />

      {/* 2. Dual-Layer Oil Paint Cursor */}
      <ImpressionistCursor />

      {/* 3. Multi-Layer Interactive Canvas Intro */}
      {showIntro && (
        <ImpressionistIntro
          onEnter={() => setShowIntro(false)}
          onThemeChange={(themeId) => setCurrentTheme(themeId)}
        />
      )}

      {/* 4. Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-40 glass-art-header backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-700 text-sm font-bold text-slate-100 shadow-lg transition-all duration-500"
              style={{ boxShadow: `0 0 20px ${activeThemeConfig.hex}50` }}
            >
              PHT
            </div>
            <div>
              <div className={`text-base font-bold tracking-wide font-art-title ${activeThemeConfig.gradientClass} transition-all duration-500`}>
                {profile.name}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {profile.role}
              </div>
            </div>
          </div>

          <nav
            className="hidden items-center gap-6 rounded-full border border-slate-700/60 bg-slate-950/70 px-8 py-2.5 text-xs font-semibold uppercase tracking-widest text-slate-300 shadow-2xl md:flex"
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
                className="transition-colors hover:text-white cursor-pointer"
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Theme Color Picker Dots in Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800">
              {Object.values(THEME_PRESETS).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t.id)}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    currentTheme === t.id ? "scale-125 ring-2 ring-white shadow-lg" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: t.hex, boxShadow: `0 0 8px ${t.hex}` }}
                  title={`Switch theme to ${t.name}`}
                />
              ))}
            </div>

            <a
              className={`rounded-full bg-gradient-to-r ${activeThemeConfig.btnGradientClass} px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105`}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* 5. Main Portfolio Content */}
      <main ref={mainRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-10">
        {/* HERO SECTION */}
        <section
          className="gsap-reveal-section relative overflow-hidden rounded-[3rem] glass-art-card p-8 sm:p-14 mb-24 transition-all duration-500"
          style={{ borderColor: activeThemeConfig.borderColor }}
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-slate-800/15 blur-[140px]" />

          {/* Top-Left Floating 3D Cat Mascot */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-20 pointer-events-auto">
            <Artistic3DMascot themeColor={activeThemeConfig.hex} />
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] pt-8 sm:pt-4">
            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/80 border border-slate-700/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: activeThemeConfig.hex }} />
                  <span>{profile.location} &bull; Software Engineering</span>
                </div>

                <h1 className={`font-art-title text-5xl font-bold leading-[1.08] tracking-tight sm:text-7xl ${activeThemeConfig.gradientClass} transition-all duration-500`}>
                  {profile.name}
                </h1>

                <p className="max-w-xl text-lg font-light leading-relaxed text-slate-300 sm:text-xl">
                  {profile.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {profile.techBadges.map((badge) => (
                  <Badge key={badge} tone={activeThemeConfig.badgeTone}>
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${activeThemeConfig.btnGradientClass} px-8 py-4 text-sm font-bold shadow-xl transition-all duration-500 hover:scale-105`}
                  style={{ boxShadow: `0 0 25px ${activeThemeConfig.hex}60` }}
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  <span>View Selected Projects</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                >
                  <Mail className="w-4 h-4" style={{ color: activeThemeConfig.hex }} />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>

            {/* Hero Right Featured Card */}
            <div className="grid gap-6">
              <div
                className="relative rounded-[2.5rem] bg-slate-950/80 border p-8 shadow-2xl backdrop-blur-xl transition-all duration-500"
                style={{ borderColor: activeThemeConfig.borderColor }}
              >
                <div className="absolute -right-3 -top-3 rounded-full bg-slate-900 border border-slate-700 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200 shadow-md">
                  {profile.role}
                </div>

                <div className="flex items-center gap-5">
                  <div
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 shadow-2xl transition-all duration-500"
                    style={{ borderColor: activeThemeConfig.hex, boxShadow: `0 0 20px ${activeThemeConfig.hex}50` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/avatar.jpg"
                      alt={profile.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]" style={{ color: activeThemeConfig.hex }}>
                      Featured Project
                    </span>
                    <h3 className={`mt-1 text-2xl font-bold font-art-title ${activeThemeConfig.gradientClass} transition-all duration-500`}>
                      {projects[0]?.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">
                      {projects[0]?.type}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
                  {projects[0]?.highlights.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: activeThemeConfig.hex, boxShadow: `0 0 8px ${activeThemeConfig.hex}` }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[2rem] bg-slate-950/70 border border-slate-800 p-5 text-center shadow-lg backdrop-blur-md"
                  >
                    <p className={`text-3xl font-bold font-art-title ${activeThemeConfig.gradientClass} transition-all duration-500`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS GALLERY SECTION */}
        <section id="projects" className="gsap-reveal-section mt-28 scroll-mt-28 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <SectionHeading
                eyebrow="Gallery of Work"
                title="Featured Selected Projects"
                subtitle="Production systems, agricultural auction marketplace, capstone game ecosystem, and microservices."
              />
              <div className="hidden sm:block">
                <ProjectCrystalOrb />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as string)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-slate-950 font-bold shadow-lg"
                      : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-art-wall">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="gsap-reveal-section mt-28 scroll-mt-28 space-y-10">
          <div className="flex items-center justify-between gap-6">
            <SectionHeading
              eyebrow="Biography & Vision"
              title="Studio Biography & Statement"
              subtitle={profile.summary}
            />
            <div className="hidden sm:block">
              <BioEtherSphere />
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] glass-art-card p-8 text-slate-100">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-700/50 shadow-2xl relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: activeThemeConfig.hex }}>
                    Location
                  </span>
                  <br />
                  <span className="font-semibold text-slate-100">{profile.location}</span>
                </p>
                <p>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: activeThemeConfig.hex }}>
                    Direct Email
                  </span>
                  <br />
                  <span className="font-semibold text-slate-100">{profile.email}</span>
                </p>
              </div>
            </div>

            <div className="rounded-[2.5rem] glass-art-card p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.35em]" style={{ color: activeThemeConfig.hex }}>
                  Engineering Statement
                </span>
                <p className="mt-4 text-lg font-light leading-relaxed text-slate-200">
                  {profile.summary}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-800">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:border-slate-500 hover:text-white transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${activeThemeConfig.btnGradientClass} px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105`}
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>Direct Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="gsap-reveal-section mt-28 scroll-mt-28 space-y-10">
          <div className="flex items-center justify-between gap-6">
            <SectionHeading
              eyebrow="Work Experience"
              title="Project & Engineering Timeline"
              subtitle="Key roles, technical contributions, QA test execution, and collaboration."
            />
            <div className="hidden sm:block">
              <TimelineClock3D />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {experience.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="gsap-reveal-section mt-28 scroll-mt-28 space-y-10">
          <div className="flex items-center justify-between gap-6">
            <SectionHeading
              eyebrow="Capabilities"
              title="Engineering Capabilities & Stack"
              subtitle="Backend microservices, modern frontend tools, databases, and pragmatic developer practices."
            />
            <div className="hidden sm:block">
              <SkillNodeCube />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <SkillCard key={group.category} group={group} />
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="gsap-reveal-section mt-28 scroll-mt-28 space-y-10">
          <div className="flex items-center justify-between gap-6">
            <SectionHeading
              eyebrow="Education"
              title="Formal Academic Training"
              subtitle="Software Engineering degree program at FPT University."
            />
            <div className="hidden sm:block">
              <AcademicLaurel3D />
            </div>
          </div>
          <div className="rounded-[2.5rem] glass-art-card p-8 sm:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className={`font-art-title text-3xl font-bold tracking-tight ${activeThemeConfig.gradientClass} transition-all duration-500`}>
                  {education.degree}
                </h3>
                <p className="mt-1 text-base font-semibold text-slate-300">
                  {education.school}
                </p>
              </div>
              <Badge tone={activeThemeConfig.badgeTone}>{education.period}</Badge>
            </div>

            <div className="mt-6 text-sm font-semibold text-slate-300">
              Cumulative GPA: <span className="font-bold text-lg" style={{ color: activeThemeConfig.hex }}>{education.gpa}</span>
            </div>

            {education.status && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 text-sm text-emerald-300 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{education.status}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2.5">
              {education.coursework.map((item) => (
                <Badge key={item} tone="muted">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* AWARDS & CERTIFICATES SECTION */}
        <section className="gsap-reveal-section mt-28 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Awards"
              title="Academic Honors"
              subtitle="Consistently recognized for academic performance."
            />
            <div className="rounded-[2.5rem] glass-art-card p-8">
              <ul className="space-y-4 text-sm font-medium leading-relaxed text-slate-300">
                {awards.map((award) => (
                  <li key={award} className="flex items-start gap-4">
                    <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: activeThemeConfig.hex }} />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Certificates"
              title="Professional Certifications"
              subtitle="Continuous skill enhancement and training."
            />
            <div className="rounded-[2.5rem] glass-art-card p-8">
              <ul className="space-y-4 text-sm font-medium leading-relaxed text-slate-300">
                {certificates.map((certificate) => (
                  <li key={certificate} className="flex items-start gap-4">
                    <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{certificate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="gsap-reveal-section mt-28 scroll-mt-28 pb-10">
          <div className="relative overflow-hidden rounded-[3rem] glass-art-card p-10 sm:p-16 text-slate-100">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-slate-800/20 blur-[100px]" />

            <div className="relative z-10 w-full max-w-2xl space-y-8">
              <SectionHeading
                eyebrow="Get In Touch"
                title="Let's Build Something Exceptional"
                subtitle="Open to internship and junior software engineering roles. Feel free to contact me anytime."
              />

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r ${activeThemeConfig.btnGradientClass} px-8 py-4 text-sm font-bold shadow-xl transition-all duration-500 hover:scale-105`}
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>Direct Email</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-slate-900 border border-slate-700 px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm font-medium text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className={`font-art-title text-lg font-bold ${activeThemeConfig.gradientClass}`}>{profile.name}</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                {profile.email}
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Phan Hong Tai. Built with Next.js, Three.js & GSAP. Inspired by Monet & Van Gogh.
          </p>
        </div>
      </footer>
    </div>
  );
}
