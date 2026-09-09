"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ── Animated counter that counts up from 0 ── */
export function CountUp({ end, duration = 1.6, suffix = "", prefix = "" }: {
  end: number; duration?: number; suffix?: string; prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = prefix + Math.round(eased * end) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ── SVG score ring (animated on mount) ── */
export function ScoreRing({ score, size = 100, stroke = 7, color = "#6366f1" }: {
  score: number; size?: number; stroke?: number; color?: string;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const [mounted, setMounted] = useState(false);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke}
        className="text-slate-200 dark:text-white/10" />
      <circle ref={ref} cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={mounted ? offset : circ}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)" }} />
    </svg>
  );
}

/* ── Pulsing dot ── */
export function PulseDot({ color = "bg-emerald-500" }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

/* ── Animated progress bar ── */
export function AnimatedBar({ value, color = "from-indigo-600 to-violet-500" }: {
  value: number; color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
      <div ref={ref} className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-[1.4s] cubic-bezier(.22,1,.36,1)`}
        style={{ width: mounted ? `${value}%` : "0%" }} />
    </div>
  );
}

/* ── Floating orbs (background decoration) ── */
export function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px] animate-float" />
      <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[80px] animate-float" style={{ animationDelay: "3s" }} />
    </div>
  );
}

/* ── Animated flow step ── */
export function FlowStep({ icon, label, active, done }: {
  icon: ReactNode; label: string; active?: boolean; done?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${active ? "scale-110" : ""}`}>
      <div className={`grid size-14 place-items-center rounded-2xl text-lg transition-all duration-300 ${
        done ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          : active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 animate-pulse-glow"
            : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-600"
      }`}>{icon}</div>
      <span className={`text-xs font-bold text-center max-w-[80px] leading-tight ${
        done || active ? "text-slate-900 dark:text-white" : "text-slate-400"
      }`}>{label}</span>
    </div>
  );
}

/* ── Flow arrow between steps ── */
export function FlowArrow({ done }: { done?: boolean }) {
  return (
    <div className="flex-1 flex items-center pt-0">
      <div className={`h-0.5 w-full transition-colors duration-500 ${done ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10"}`} />
    </div>
  );
}

/* ── Stagger wrapper ── */
export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`stagger-reveal ${className}`}>{children}</div>;
}

/* ── Glow card — card with animated border glow ── */
export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative group rounded-3xl p-px ${className}`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-3xl bg-white dark:bg-[#111827] h-full">{children}</div>
    </div>
  );
}

/* ── Hero section mesh gradient background ── */
export function MeshGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[120px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-500/15 to-pink-500/15 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
    </div>
  );
}
