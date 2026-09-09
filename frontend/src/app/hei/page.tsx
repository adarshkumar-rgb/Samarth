"use client";
import { Building2, ChevronRight, CircleCheck, Sparkles, UsersRound, Target, FlaskConical, GraduationCap, MapPin, Lightbulb } from "lucide-react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { CountUp, Stagger, AnimatedBar } from "@/components/samarth/animated";

const matchedChallenges = [
  {
    title: "Safe crossings near schools",
    voices: 18,
    confidence: 94,
    why: "Road-safety expertise + local civic partnership + available team",
  },
  {
    title: "Dark streets after 7 PM",
    voices: 24,
    confidence: 87,
    why: "Urban lighting research + simulation lab + 2 faculty available",
  },
];

const capabilities = [
  { label: "Transport Safety", icon: <Target size={16} />, strength: 92 },
  { label: "Civic Data Analytics", icon: <FlaskConical size={16} />, strength: 85 },
  { label: "Urban Planning", icon: <Lightbulb size={16} />, strength: 78 },
  { label: "Student Innovation", icon: <GraduationCap size={16} />, strength: 88 },
];

export default function Hei() {
  return (
    <AppShell eyebrow="Institution portal" title="Your expertise is needed nearby.">
      <Stagger>
        {/* Institution header card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 p-7 text-white md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <StatusPill tone="green">Profile 92% complete</StatusPill>
              <h2 className="mt-5 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>Bengaluru Mobility Lab</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Your transport research and civic partnerships are creating unusually strong matches this month.
              </p>
            </div>
            <Building2 className="size-10 text-indigo-300" />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-5">
            <Score value="7" label="open matches" />
            <Score value="94" label="average fit" />
            <Score value="3" label="active pilots" />
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {/* Highest opportunity challenge */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Highest opportunity</p>
                <h2 className="mt-2 text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>Safe crossings near schools</h2>
              </div>
              <Sparkles className="text-amber-500 shrink-0" size={20} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              18 parents reported the same risk. Your road-safety work and civic access make this a high-confidence partnership.
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <UsersRound size={16} /> 18 voices
              </span>
              <button className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Review brief <ChevronRight size={15} />
              </button>
            </div>
          </section>

          {/* Capability card */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Capability profile</p>
            <div className="mt-4 space-y-4">
              {capabilities.map((c) => (
                <div key={c.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {c.icon} {c.label}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">{c.strength}%</span>
                  </div>
                  <AnimatedBar value={c.strength} color="from-indigo-500 to-violet-500" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Matched challenges list */}
        <section className="mt-7 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Matched challenges</p>
              <h2 className="mt-2 text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>These need your institution</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {matchedChallenges.map((c) => (
              <div key={c.title} className="card-hover flex flex-wrap items-center gap-4 rounded-2xl bg-muted p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.why}</p>
                </div>
                <StatusPill tone="green">{c.confidence}% match</StatusPill>
                <span className="text-xs text-muted-foreground"><UsersRound className="inline" size={13} /> {c.voices} voices</span>
                <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md">
                  Accept <ChevronRight className="inline" size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick stats */}
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {[
            { label: "Faculty involved", value: 12, icon: <GraduationCap size={18} />, color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" },
            { label: "Student builders", value: 45, icon: <UsersRound size={18} />, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" },
            { label: "Past projects", value: 23, icon: <Target size={18} />, color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="card-hover rounded-3xl border border-border bg-card p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${s.color}`}>{s.icon}</span>
              <p className="mt-4 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                <CountUp end={s.value} duration={1.4} />
              </p>
              <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Stagger>
    </AppShell>
  );
}

function Score({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <b className="block text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>{value}</b>
      <span className="text-xs text-indigo-200">{label}</span>
    </div>
  );
}
