"use client";

import { useEffect, useState } from "react";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function ImpressionistCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    let particleId = 0;
    const colors = ["#38bdf8", "#c084fc", "#e2e8f0", "#ffffff"];

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }

      if (Math.random() > 0.45) {
        const newParticle: TrailParticle = {
          id: particleId++,
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setTrail((prev) => [...prev.slice(-14), newParticle]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Outer Water Ripple Ring */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400/40 transition-transform duration-300 ease-out backdrop-blur-[1px] ${
          isPointer ? "w-14 h-14 bg-white/10 border-white scale-125" : "w-9 h-9"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Inner Core Glow */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100 ${
          isPointer ? "w-3.5 h-3.5 bg-white shadow-[0_0_14px_#ffffff]" : "w-2 h-2 bg-slate-200 shadow-[0_0_10px_#cbd5e1]"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trailing Particles */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-ping duration-1000 opacity-50"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
