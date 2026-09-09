"use client";
import { ArrowUpRight, CalendarDays, CheckCircle2, Clock, Droplets, Users, MapPin, Target } from "lucide-react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { AnimatedBar, Stagger, CountUp } from "@/components/samarth/animated";

const projects = [
  {
    title: "Water, within walking distance",
    area: "Madhupur · Deoghar",
    progress: 72,
    days: "9 days to pilot",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
    textColor: "text-cyan-700 dark:text-cyan-300",
    team: 8,
    stage: "Prototype",
    milestones: [
      { name: "Community survey", done: true },
      { name: "Pipeline mapping", done: true },
      { name: "Prototype build", done: false, active: true },
      { name: "Pilot launch", done: false },
    ],
  },
  {
    title: "Safe routes to school",
    area: "Kanke · Ranchi",
    progress: 48,
    days: "Research in progress",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    textColor: "text-amber-700 dark:text-amber-300",
    team: 12,
    stage: "Development",
    milestones: [
      { name: "Risk mapping", done: true },
      { name: "Stakeholder review", done: false, active: true },
      { name: "Design proposal", done: false },
      { name: "Pilot deployment", done: false },
    ],
  },
];

const upcomingMilestones = [
  { title: "Community walk-through", date: "Tomorrow", project: "Water, within walking distance", icon: <MapPin size={16} /> },
  { title: "Civic review meeting", date: "Friday", project: "Safe routes to school", icon: <CheckCircle2 size={16} /> },
  { title: "Pilot launch event", date: "18 Sep", project: "Water, within walking distance", icon: <Target size={16} /> },
];

export default function Projects() {
  return (
    <AppShell eyebrow="Delivery tracker" title="Small steps. Visible change.">
      <Stagger>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="card-hover overflow-hidden rounded-3xl border border-border bg-card">
              {/* Gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${p.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <StatusPill tone="green">On track</StatusPill>
                  <span className={`rounded-lg px-2 py-1 text-[11px] font-bold ${p.bgColor} ${p.textColor}`}>
                    {p.stage}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={13} /> {p.area}
                </p>

                {/* Progress */}
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="font-bold">{p.progress}% complete</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Clock size={14} /> {p.days}</span>
                </div>
                <div className="mt-3">
                  <AnimatedBar value={p.progress} color={p.color} />
                </div>

                {/* Mini milestone track */}
                <div className="mt-6 flex items-center gap-2">
                  {p.milestones.map((m, i) => (
                    <div key={m.name} className="contents">
                      <div className={`grid size-7 place-items-center rounded-full text-[10px] font-bold transition-all ${
                        m.done
                          ? "bg-emerald-500 text-white"
                          : m.active
                            ? "bg-indigo-600 text-white animate-pulse-glow"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {m.done ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      {i < p.milestones.length - 1 && (
                        <div className={`h-0.5 flex-1 rounded ${m.done ? "bg-emerald-500" : "bg-muted"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-3">
                  {p.milestones.map((m) => (
                    <span key={m.name} className={`flex-1 text-center text-[9px] font-semibold ${m.done ? "text-emerald-600" : m.active ? "text-indigo-600" : "text-muted-foreground"}`}>
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} /> {p.team} builders
                  </span>
                  <button className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Open project <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Upcoming milestones ── */}
        <section className="mt-7 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Milestone radar</p>
              <h2 className="mt-2 text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>What is coming up?</h2>
            </div>
            <CalendarDays className="text-indigo-500" size={20} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {upcomingMilestones.map((m, i) => (
              <div key={m.title} className="card-hover flex gap-3 rounded-2xl bg-muted p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                  {m.icon}
                </span>
                <div>
                  <p className="text-sm font-bold">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.project}</p>
                  <p className="mt-1 text-xs font-semibold text-indigo-600">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Impact metrics ── */}
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {[
            { label: "People reached", value: 342, icon: <Users size={18} />, color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" },
            { label: "Solutions deployed", value: 3, icon: <CheckCircle2 size={18} />, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" },
            { label: "Avg days to pilot", value: 28, icon: <Clock size={18} />, color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600" },
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
