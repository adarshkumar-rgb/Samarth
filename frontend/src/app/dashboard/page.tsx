"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, TrendingUp, Users, Target, Zap, Globe } from "lucide-react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { CountUp, AnimatedBar, Stagger, FloatingOrbs } from "@/components/samarth/animated";

const challenges = [
  { name: "Unsafe crossings near school", place: "Koramangala, Bengaluru", severity: "Critical", tone: "rose" as const, stage: 68, icon: "\u{1F6B8}", voices: 18 },
  { name: "Summer water gaps", place: "Dharavi, Mumbai", severity: "Matched", tone: "green" as const, stage: 46, icon: "\u{1F4A7}", voices: 32 },
  { name: "E-waste has no home", place: "Viman Nagar, Pune", severity: "Validating", tone: "amber" as const, stage: 28, icon: "\u{267B}\u{FE0F}", voices: 12 },
];

export default function Dashboard() {
  return (
    <AppShell
      eyebrow="Good afternoon, Aarav"
      title="Here's the change you're helping move."
      action={
        <Link
          href="/problems/new"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          + Raise a challenge
        </Link>
      }
    >
      <Stagger>
        {/* ── Hero card + weekly chart ── */}
        <div className="grid gap-5 xl:grid-cols-[1.55fr_.8fr]">
          <section className="hero-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-indigo-950/15 md:p-8">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative z-10 flex justify-between">
              <div>
                <StatusPill tone="green">Impact pulse is rising</StatusPill>
                <h2 className="mt-5 max-w-lg text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  Your neighbourhood is one action away from safer school crossings.
                </h2>
              </div>
              <Sparkles className="text-amber-300 shrink-0" />
            </div>
            <div className="relative z-10 mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
              <Metric value="18" label="voices united" />
              <Metric value="3" label="capable partners" />
              <Metric value="72" label="impact signal" />
            </div>
          </section>

          <aside className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>Your weekly momentum</p>
            <div className="mt-5 flex h-28 items-end gap-2">
              {[25, 42, 31, 68, 45, 80, 94].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-700"
                  style={{ height: `${v}%`, transitionDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Mon</span><span>Sun</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <b className="text-emerald-600">+24%</b> more community signal this week
            </p>
          </aside>
        </div>

        {/* ── Challenge list + geo heat ── */}
        <div className="mt-7 grid gap-7 xl:grid-cols-[1.5fr_.85fr]">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>Challenges near you</h2>
              <Link href="/matches" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                View all <ArrowRight className="inline" size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {challenges.map((c) => (
                <Link
                  key={c.name}
                  href={`/problems/${c.name === "Unsafe crossings near school" ? "school-crossing" : "water-access"}`}
                  className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-xl">{c.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{c.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={12} /> {c.place}
                    </p>
                  </div>
                  <div className="hidden flex-col items-end gap-2 sm:flex">
                    <StatusPill tone={c.tone}>{c.severity}</StatusPill>
                    <span className="text-xs text-muted-foreground">{c.voices} voices</span>
                  </div>
                  <div className="w-24">
                    <AnimatedBar value={c.stage} />
                    <p className="mt-1 text-right text-[10px] text-muted-foreground">{c.stage}%</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Geographic overview ── */}
          <aside className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Globe className="text-indigo-500" size={18} />
              <p className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>Geographic pulse</p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { city: "Bengaluru", count: 8, pct: 100 },
                { city: "Mumbai", count: 5, pct: 62 },
                { city: "Pune", count: 3, pct: 38 },
                { city: "Delhi", count: 2, pct: 25 },
              ].map((c) => (
                <div key={c.city}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold">{c.city}</span>
                    <span className="text-muted-foreground">{c.count} active</span>
                  </div>
                  <AnimatedBar value={c.pct} color="from-indigo-500 to-purple-400" />
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* ── Quick stats row ── */}
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Target className="text-indigo-600" size={20} />, label: "Total challenges", value: 156, color: "bg-indigo-50 dark:bg-indigo-500/10" },
            { icon: <Users className="text-emerald-600" size={20} />, label: "Active voices", value: 2431, color: "bg-emerald-50 dark:bg-emerald-500/10" },
            { icon: <Zap className="text-amber-600" size={20} />, label: "Solutions in progress", value: 34, color: "bg-amber-50 dark:bg-amber-500/10" },
            { icon: <TrendingUp className="text-rose-600" size={20} />, label: "Impact score", value: 89, suffix: "%", color: "bg-rose-50 dark:bg-rose-500/10" },
          ].map((s) => (
            <div key={s.label} className="card-hover rounded-3xl border border-border bg-card p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${s.color}`}>{s.icon}</span>
              <p className="mt-4 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                <CountUp end={s.value} suffix={s.suffix || ""} duration={1.6} />
              </p>
              <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Stagger>
    </AppShell>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <b className="block text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>{value}</b>
      <span className="text-xs text-indigo-200">{label}</span>
    </div>
  );
}
