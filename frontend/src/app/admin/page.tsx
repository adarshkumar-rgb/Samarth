"use client";
import { Check, Eye, ShieldCheck, X, BarChart3, MapPin, TrendingUp, Users, AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { CountUp, AnimatedBar, Stagger } from "@/components/samarth/animated";

const initialQueue = [
  { id: "q1", title: "Unlit bus-stop approach", location: "Bokaro Steel City, Bokaro", evidence: 3, voices: 24, severity: "Medium" as const },
  { id: "q2", title: "Missed waste collection", location: "Mango, Jamshedpur", evidence: 5, voices: 17, severity: "High" as const },
  { id: "q3", title: "Unsafe school crossing", location: "Kanke, Ranchi", evidence: 9, voices: 26, severity: "Critical" as const },
];

const analytics = [
  { label: "Total challenges", value: 156, change: "+12%", icon: <BarChart3 size={18} />, color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" },
  { label: "Validated this week", value: 89, change: "+8%", icon: <Check size={18} />, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" },
  { label: "Avg response time", value: 42, suffix: " min", change: "-15%", icon: <Clock size={18} />, color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600" },
  { label: "Active contributors", value: 234, change: "+22%", icon: <Users size={18} />, color: "bg-violet-50 dark:bg-violet-500/10 text-violet-600" },
];

const categoryData = [
  { label: "Safety", count: 38, color: "bg-rose-500" },
  { label: "Water", count: 24, color: "bg-cyan-500" },
  { label: "Environment", count: 18, color: "bg-emerald-500" },
  { label: "Infrastructure", count: 14, color: "bg-amber-500" },
  { label: "Education", count: 6, color: "bg-indigo-500" },
];

const recentActivity = [
  { action: "Challenge validated", detail: "Unsafe crossings near school", time: "2 min ago", tone: "green" as const },
  { action: "Partner matched", detail: "Summer water gaps → 2 institutions", time: "18 min ago", tone: "indigo" as const },
  { action: "New submission", detail: "Plastic dumping near lake", time: "1 hour ago", tone: "amber" as const },
  { action: "Project milestone", detail: "Water project: prototype build started", time: "3 hours ago", tone: "green" as const },
];

export default function Admin() {
  const [items, setItems] = useState(initialQueue);
  const [done, setDone] = useState<string[]>([]);

  const handle = (id: string) => {
    setDone([...done, id]);
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <AppShell eyebrow="Trust & verification" title="Keep the signal reliable.">
      <Stagger>
        {/* KPI cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analytics.map((a) => (
            <div key={a.label} className="card-hover rounded-3xl border border-border bg-card p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${a.color}`}>{a.icon}</span>
              <p className="mt-4 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                <CountUp end={a.value} suffix={a.suffix || ""} />
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">{a.label}</p>
                <span className={`text-xs font-bold ${a.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                  {a.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-7 xl:grid-cols-[1.3fr_.7fr]">
          {/* Validation queue */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black" style={{ fontFamily: "var(--font-heading)" }}>Validation queue</h2>
                <p className="mt-1 text-sm text-muted-foreground">Decide with context — not just a form.</p>
              </div>
              <StatusPill tone="amber">Live queue</StatusPill>
            </div>

            <div className="mt-5 space-y-3">
              {items.length ? (
                items.map((x, i) => (
                  <div key={x.id} className="card-hover flex flex-wrap items-center gap-4 rounded-2xl bg-muted p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 font-black text-indigo-600 dark:bg-indigo-500/10">
                      0{i + 1}
                    </span>
                    <div className="min-w-[180px] flex-1">
                      <h3 className="font-bold text-sm">{x.title}</h3>
                      <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {x.location}</span>
                        <span>{x.evidence} evidence</span>
                        <span>{x.voices} voices</span>
                      </p>
                    </div>
                    <StatusPill tone={
                      x.severity === "Critical" ? "rose" : x.severity === "High" ? "amber" : "indigo"
                    }>{x.severity}</StatusPill>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-card p-2 text-muted-foreground shadow-sm border border-border transition-all hover:shadow-md">
                        <Eye size={17} />
                      </button>
                      <button onClick={() => handle(x.id)} className="rounded-lg bg-emerald-600 p-2 text-white shadow-sm transition-all hover:shadow-md hover:bg-emerald-700">
                        <Check size={17} />
                      </button>
                      <button onClick={() => handle(x.id)} className="rounded-lg bg-rose-50 p-2 text-rose-600 dark:bg-rose-500/10 transition-all hover:shadow-md">
                        <X size={17} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <ShieldCheck className="mx-auto text-emerald-500" size={40} />
                  <p className="mt-3 font-bold" style={{ fontFamily: "var(--font-heading)" }}>The queue is beautifully clear.</p>
                  <p className="text-sm text-muted-foreground">You&apos;ve handled every incoming signal.</p>
                </div>
              )}
            </div>
          </section>

          {/* Right column */}
          <div className="space-y-5">
            {/* Category breakdown */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">By category</p>
              <div className="mt-4 space-y-3">
                {categoryData.map((c) => (
                  <div key={c.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-semibold">{c.label}</span>
                      <span className="text-muted-foreground">{c.count}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${c.color} transition-all duration-[1.2s]`}
                        style={{ width: `${c.count * 2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent activity</p>
              <div className="mt-4 space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <StatusPill tone={a.tone}>{a.action}</StatusPill>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{a.detail}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Urgent notice */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} />
            <div>
              <p className="text-sm font-bold">3 challenges with 15+ voices need priority review this week.</p>
              <p className="text-xs text-indigo-100">These represent the highest community demand and should be validated first.</p>
            </div>
          </div>
        </div>
      </Stagger>
    </AppShell>
  );
}
