"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Compass, Eye, Paintbrush, Volume2, VolumeX } from "lucide-react";
import { profile } from "../data/portfolio";

interface ImpressionistIntroProps {
  onEnter: () => void;
  onThemeChange?: (themeId: "gold" | "sapphire" | "iris" | "white") => void;
}

interface PaintTheme {
  id: string;
  color: string;
  label: string;
  textGradient: string;
  btnGradient: string;
  btnShadow: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
}

const PAINT_THEMES: PaintTheme[] = [
  {
    id: "gold",
    color: "#d4af37",
    label: "Moonlit Gold",
    textGradient: "from-amber-100 via-amber-300 to-amber-500",
    btnGradient: "from-amber-500 via-amber-600 to-indigo-600 text-slate-950",
    btnShadow: "rgba(212,175,55,0.5)",
    badgeBg: "bg-amber-400/10",
    badgeBorder: "border-amber-300/30",
    badgeText: "text-amber-300",
    glowColor: "rgba(212,175,55,0.25)",
  },
  {
    id: "sapphire",
    color: "#38bdf8",
    label: "Sapphire Blue",
    textGradient: "from-sky-100 via-sky-300 to-blue-500",
    btnGradient: "from-sky-400 via-blue-500 to-indigo-600 text-slate-950",
    btnShadow: "rgba(56,189,248,0.5)",
    badgeBg: "bg-sky-400/10",
    badgeBorder: "border-sky-300/30",
    badgeText: "text-sky-300",
    glowColor: "rgba(56,189,248,0.25)",
  },
  {
    id: "iris",
    color: "#c084fc",
    label: "Iris Purple",
    textGradient: "from-purple-100 via-purple-300 to-fuchsia-500",
    btnGradient: "from-purple-400 via-fuchsia-500 to-pink-600 text-slate-950",
    btnShadow: "rgba(192,132,252,0.5)",
    badgeBg: "bg-purple-400/10",
    badgeBorder: "border-purple-300/30",
    badgeText: "text-purple-300",
    glowColor: "rgba(192,132,252,0.25)",
  },
  {
    id: "white",
    color: "#ffffff",
    label: "Pure White",
    textGradient: "from-white via-slate-200 to-slate-400",
    btnGradient: "from-slate-100 via-slate-300 to-slate-500 text-slate-950",
    btnShadow: "rgba(255,255,255,0.5)",
    badgeBg: "bg-white/10",
    badgeBorder: "border-white/30",
    badgeText: "text-white",
    glowColor: "rgba(255,255,255,0.25)",
  },
];

export function ImpressionistIntro({ onEnter, onThemeChange }: ImpressionistIntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeTheme, setActiveTheme] = useState<PaintTheme>(PAINT_THEMES[0]);
  const paintColorRef = useRef<string>(PAINT_THEMES[0].color);
  const [isMuted, setIsMuted] = useState(true);
  const [paintCount, setPaintCount] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const addBurstRef = useRef<((color: string) => void) | null>(null);

  const handleSelectTheme = (theme: PaintTheme) => {
    setActiveTheme(theme);
    paintColorRef.current = theme.color;

    if (onThemeChange) {
      onThemeChange(theme.id as "gold" | "sapphire" | "iris" | "white");
    }

    // Trigger instant canvas particle burst in selected color
    if (addBurstRef.current) {
      addBurstRef.current(theme.color);
    }
  };

  // Canvas paint trail setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Stroke {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      vx: number;
      vy: number;
    }

    let strokes: Stroke[] = [];
    let isMouseDown = false;

    const addStroke = (x: number, y: number, customColor?: string) => {
      const colorToUse = customColor || paintColorRef.current;
      for (let i = 0; i < 4; i++) {
        strokes.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          radius: Math.random() * 12 + 6,
          color: colorToUse,
          alpha: 0.95,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 0.5,
        });
      }
      setPaintCount((prev) => prev + 1);
    };

    // Burst explosion when color button is clicked
    addBurstRef.current = (color: string) => {
      const centerX = width / 2;
      const centerY = height / 2;
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        strokes.push({
          x: centerX,
          y: centerY,
          radius: Math.random() * 14 + 6,
          color: color,
          alpha: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isMouseDown || Math.random() < 0.35) {
        addStroke(clientX, clientY);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      addStroke(clientX, clientY);
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("touchend", handlePointerUp);

    let animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(8, 12, 22, 0.16)";
      ctx.fillRect(0, 0, width, height);

      for (let i = strokes.length - 1; i >= 0; i--) {
        const s = strokes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.009;
        s.radius *= 0.98;

        if (s.alpha <= 0 || s.radius <= 0.5) {
          strokes.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchend", handlePointerUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.88, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }, introRef);

    return () => ctx.revert();
  }, []);

  // Web Audio Synth ambient chime
  const toggleSound = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (isMuted) {
      setIsMuted(false);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(329.63, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.5);
    } else {
      setIsMuted(true);
    }
  };

  const handleDismiss = () => {
    if (!introRef.current) {
      onEnter();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter();
      },
    });

    tl.to(cardRef.current, {
      scale: 1.08,
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.6,
      ease: "power2.inOut",
    })
      .to(
        ".intro-curtain-left",
        {
          xPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.4"
      )
      .to(
        ".intro-curtain-right",
        {
          xPercent: 100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=1.1"
      )
      .to(
        introRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.2"
      );
  };

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#080c16]"
    >
      {/* Interactive Oil Paint Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 cursor-crosshair" />

      {/* GSAP Curtain Reveal Overlay */}
      <div className="intro-curtain-left absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-[#080c16] via-[#0d162a] to-transparent z-40 pointer-events-none" />
      <div className="intro-curtain-right absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#080c16] via-[#0d162a] to-transparent z-40 pointer-events-none" />

      {/* Atmospheric Background Dynamic Light Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full blur-[140px] transition-all duration-700 animate-pulse-glow"
          style={{ backgroundColor: activeTheme.glowColor }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] transition-all duration-700 animate-pulse-glow"
          style={{ backgroundColor: activeTheme.glowColor }}
        />
      </div>

      {/* Center Display Card */}
      <div
        ref={cardRef}
        className="relative z-30 max-w-2xl w-full mx-6 p-8 sm:p-12 rounded-[2.5rem] glass-art-card text-center text-slate-100 shadow-[0_30px_90px_rgba(0,0,0,0.8)] transition-all duration-500"
        style={{ borderColor: activeTheme.glowColor }}
      >
        {/* Dynamic Header Badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full ${activeTheme.badgeBg} border ${activeTheme.badgeBorder} ${activeTheme.badgeText} text-xs font-semibold tracking-[0.25em] uppercase mb-6 transition-all duration-500`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Software Engineer Portfolio</span>
        </div>

        {/* Dynamic Gradient Title */}
        <h1
          className={`font-art-title text-4xl sm:text-6xl font-bold leading-tight tracking-tight mb-3 bg-gradient-to-r ${activeTheme.textGradient} bg-clip-text text-transparent transition-all duration-500`}
        >
          {profile.name}
        </h1>

        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 mb-4">
          {profile.role}
        </p>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed mb-6">
          {profile.tagline}
        </p>

        {/* Dynamic Color Palette Selector Bar */}
        <div
          className="flex items-center justify-center gap-3 mb-8 p-2.5 rounded-full bg-slate-950/85 border border-slate-700/60 max-w-sm mx-auto shadow-2xl transition-all duration-500"
          style={{ borderColor: activeTheme.color }}
        >
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 pl-2 flex items-center gap-1.5">
            <Paintbrush className="w-3.5 h-3.5" style={{ color: activeTheme.color }} /> Theme:
          </span>
          {PAINT_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSelectTheme(theme)}
              className={`w-7 h-7 rounded-full transition-all duration-300 cursor-pointer ${
                activeTheme.id === theme.id ? "scale-125 ring-2 ring-white shadow-xl" : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: theme.color, boxShadow: `0 0 12px ${theme.color}` }}
              title={`Switch to ${theme.label}`}
            />
          ))}
        </div>

        {/* Dynamic CTA Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDismiss}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r ${activeTheme.btnGradient} font-bold text-sm tracking-wider uppercase transition-all duration-500 transform hover:-translate-y-0.5 cursor-pointer`}
            style={{ boxShadow: `0 0 30px ${activeTheme.btnShadow}` }}
          >
            <Compass className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-45" />
            <span>Explore Portfolio</span>
          </button>

          <button
            onClick={toggleSound}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-700 bg-slate-900/80 text-amber-300 hover:bg-slate-800 transition-all cursor-pointer"
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" style={{ color: activeTheme.color }} />
            Active Theme: {activeTheme.label} ({paintCount} strokes)
          </span>
          <span>Three.js + GSAP Motion</span>
        </div>
      </div>
    </div>
  );
}
