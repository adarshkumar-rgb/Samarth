"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight, BrainCircuit, Building2, ChevronRight, MapPin,
  Sparkles, Users, Zap, Shield, Target, TrendingUp, Globe,
  ArrowUpRight, CheckCircle2, Layers, GitBranch,
} from "lucide-react";
import { CountUp, FloatingOrbs, FlowStep, FlowArrow, Stagger, MeshGradient } from "@/components/samarth/animated";

const flowSteps = [
  { icon: <Users size={22} />, label: "Community reports" },
  { icon: <BrainCircuit size={22} />, label: "AI structures it" },
  { icon: <Shield size={22} />, label: "Humans validate" },
  { icon: <Building2 size={22} />, label: "Institutions match" },
  { icon: <Target size={22} />, label: "Teams form" },
  { icon: <Zap size={22} />, label: "Solutions ship" },
];

const features = [
  {
    icon: <BrainCircuit className="text-indigo-600" size={22} />,
    title: "AI Problem Intelligence",
    desc: "Natural language submissions are automatically categorized, summarized, and structured by AI — no technical expertise needed.",
    color: "from-indigo-500 to-violet-500",
    bgLight: "bg-indigo-50",
    bgDark: "dark:bg-indigo-500/10",
  },
  {
    icon: <Building2 className="text-emerald-600" size={22} />,
    title: "Capability Matching",
    desc: "Problems are matched to institutions based on faculty expertise, labs, past projects, and geography — with explainable scores.",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-500/10",
  },
  {
    icon: <Layers className="text-amber-600" size={22} />,
    title: "Full Lifecycle Tracking",
    desc: "From identification through pilot to deployment — every milestone is visible, trackable, and measurable.",
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-500/10",
  },
  {
    icon: <TrendingUp className="text-rose-600" size={22} />,
    title: "Impact Measurement",
    desc: "Quantifiable outcomes — people reached, infrastructure improved, problems solved — all in one dashboard.",
    color: "from-rose-500 to-pink-500",
    bgLight: "bg-rose-50",
    bgDark: "dark:bg-rose-500/10",
  },
];

const impactStats = [
  { value: 2431, suffix: "+", label: "Community signals", icon: <MapPin size={18} /> },
  { value: 156, suffix: "", label: "Active challenges", icon: <Target size={18} /> },
  { value: 89, suffix: "", label: "Matched institutions", icon: <Building2 size={18} /> },
  { value: 34, suffix: "", label: "Solutions deployed", icon: <CheckCircle2 size={18} /> },
];

const testimonials = [
  { name: "Dr. Priya Sharma", role: "Faculty, IIT Delhi", text: "Samarth connected us to a water quality challenge right in our neighbourhood. Our students built a solution in 8 weeks.", avatar: "PS" },
  { name: "Rajesh Kumar", role: "Municipal Officer, Pune", text: "For the first time, I can see which problems citizens care about most — and which ones are actually getting solved.", avatar: "RK" },
  { name: "Ananya Mehta", role: "Student, NIT Karnataka", text: "Our team formed through Samarth. We went from matching to prototyping in one weekend.", avatar: "AM" },
];

export default function Home() {
  const [activeFlow, setActiveFlow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % flowSteps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-foreground">
      {/* ══════ NAV ══════ */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 font-black text-white shadow-lg shadow-indigo-500/30">
            S
          </span>
          <b className="text-xl tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>Samarth</b>
        </Link>
        <div className="hidden gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#flow" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#impact" className="transition-colors hover:text-foreground">Impact pulse</a>
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <Link href="/projects" className="transition-colors hover:text-foreground">Explore projects</Link>
        </div>
        <Link
          href="/dashboard"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
        >
          Open demo <ArrowRight className="ml-1 inline" size={15} />
        </Link>
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-12 md:px-8 md:pt-20">
        <MeshGradient />
        <div className="relative z-10 grid items-center gap-16 md:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
              <Sparkles size={14} /> Built for problems that deserve momentum
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.97] tracking-[-.05em] md:text-7xl" style={{ fontFamily: "var(--font-heading)" }}>
              A problem shared.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                A future moved.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              Samarth turns everyday community needs into guided, trackable missions — connecting citizens, institutions and builders before good ideas get lost.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/problems/new"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/30"
              >
                Raise a challenge <ArrowRight className="ml-1 inline" size={15} />
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-border bg-card px-6 py-4 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                See the demo <ArrowUpRight className="ml-1 inline" size={15} />
              </Link>
            </div>

            {/* Mini stat row */}
            <div className="mt-12 flex gap-10">
              {impactStats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 text-muted-foreground">{s.icon}</div>
                  <b className="mt-1 block text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                    <CountUp end={s.value} suffix={s.suffix} duration={1.8} />
                  </b>
                  <small className="text-xs font-semibold text-muted-foreground">{s.label}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — animated card */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-10 blur-3xl" />
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold">Unsafe crossings near school</p>
                  <p className="text-xs text-muted-foreground">Koramangala, Bengaluru · 4 days ago</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <span className="text-xs font-semibold text-muted-foreground">AI Confidence</span>
                  <span className="text-sm font-bold text-indigo-600">94%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <span className="text-xs font-semibold text-muted-foreground">Community voices</span>
                  <span className="text-sm font-bold text-emerald-600">18 people</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <span className="text-xs font-semibold text-muted-foreground">Matched partners</span>
                  <span className="text-sm font-bold text-violet-600">3 institutions</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-center text-xs font-bold text-white">
                <Sparkles className="mr-1 inline" size={14} /> AI generated structured brief in 2.3s
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FLOW DIAGRAM ══════ */}
      <section id="flow" className="relative border-t border-border bg-muted/30 py-24">
        <FloatingOrbs />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">How it works</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            From voice to impact.
            <br />
            <span className="text-muted-foreground">Six steps, fully guided.</span>
          </h2>

          <Stagger className="mt-16 flex items-start justify-center gap-0">
            {flowSteps.map((step, i) => (
              <div key={i} className="contents">
                <FlowStep
                  icon={step.icon}
                  label={step.label}
                  active={i === activeFlow}
                  done={i < activeFlow}
                />
                {i < flowSteps.length - 1 && <FlowArrow done={i < activeFlow} />}
              </div>
            ))}
          </Stagger>

          <p className="mx-auto mt-12 max-w-lg text-sm text-muted-foreground">
            Every step is guided. Citizens describe problems in their own words.
            AI structures them. Institutions respond. Teams build. Impact is measured.
          </p>
        </div>
      </section>

      {/* ══════ IMPACT PULSE ══════ */}
      <section id="impact" className="py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: big gradient card */}
            <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 text-white md:p-10">
              <div className="absolute inset-0 grid-pattern opacity-10" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                  <Sparkles size={14} /> Live impact pulse
                </div>
                <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                  Real problems.
                  <br />
                  Real solutions.
                  <br />
                  Real numbers.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/80">
                  Every community signal becomes measurable impact. Track the journey from the first voice to the final outcome.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <b className="block text-3xl font-black"><CountUp end={2431} suffix="+" /></b>
                    <span className="text-xs text-white/70">Signals processed</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <b className="block text-3xl font-black"><CountUp end={94} suffix="%" /></b>
                    <span className="text-xs text-white/70">AI accuracy</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <b className="block text-3xl font-black"><CountUp end={34} /></b>
                    <span className="text-xs text-white/70">Deployed solutions</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <b className="block text-3xl font-black"><CountUp end={12} /></b>
                    <span className="text-xs text-white/70">Cities connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: chart-like visual */}
            <div className="flex flex-col gap-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Challenges by category</p>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "Safety", value: 38, color: "bg-rose-500", width: "76%" },
                    { label: "Water", value: 24, color: "bg-cyan-500", width: "48%" },
                    { label: "Environment", value: 18, color: "bg-emerald-500", width: "36%" },
                    { label: "Infrastructure", value: 14, color: "bg-amber-500", width: "28%" },
                    { label: "Education", value: 6, color: "bg-indigo-500", width: "12%" },
                  ].map((cat) => (
                    <div key={cat.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-semibold">{cat.label}</span>
                        <span className="text-muted-foreground">{cat.value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${cat.color} transition-all duration-[1.5s]`}
                          style={{ width: mounted ? cat.width : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly resolution rate</p>
                <div className="mt-4 flex items-end gap-1.5 h-32">
                  {[18, 24, 21, 35, 42, 38, 52, 61, 55, 72, 68, 84].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-[1.2s]"
                        style={{ height: mounted ? `${v}%` : "0%", transitionDelay: `${i * 60}ms` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  <span>Jan</span><span>Dec</span>
                </div>
                <p className="mt-3 text-xs"><b className="text-emerald-600">+24%</b> <span className="text-muted-foreground">more resolutions this quarter</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section id="features" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Core capabilities</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              Intelligence, not just infrastructure.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Samarth goes beyond filing complaints. Every feature is designed to convert community needs into collaborative action.
            </p>
          </div>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card-hover group rounded-3xl border border-border bg-card p-7">
                <div className={`inline-flex rounded-2xl p-3 ${f.bgLight} ${f.bgDark}`}>
                  {f.icon}
                </div>
                <h3 className="mt-5 text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Voices from the ecosystem</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              Trusted by builders.
            </h2>
          </div>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover rounded-3xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
                    {t.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <div className="hero-gradient relative overflow-hidden rounded-3xl p-10 text-white md:p-16">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
                Ready to move something real?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-white/80">
                Every great solution starts with someone deciding the status quo isn&apos;t enough.
                Raise your first challenge or join one that needs you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/problems/new"
                  className="rounded-xl bg-white px-6 py-4 text-sm font-bold text-indigo-700 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Raise a challenge <ArrowRight className="ml-1 inline" size={15} />
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-white/30 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore the demo <ArrowUpRight className="ml-1 inline" size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 font-black text-white shadow-md shadow-indigo-500/20">
                S
              </span>
              <span className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>Samarth</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#flow" className="hover:text-foreground transition-colors">How it works</a>
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
            </div>
            <p className="text-xs text-muted-foreground">
              Built for SIH 2026 · Turning community needs into measurable impact
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
