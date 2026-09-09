"use client";
import { Check, ChevronRight, HeartHandshake, Sparkles, Target, ShieldCheck, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { ScoreRing, Stagger, GlowCard } from "@/components/samarth/animated";

const partners = [
  {
    name: "Bengaluru Mobility Lab",
    kind: "Research institution",
    score: 94,
    color: "#6366f1",
    why: [
      "Worked on 8 safe-street pilots",
      "Has a local civic partnership",
      "Road-safety expertise matches",
    ],
    capabilities: ["Transport Research", "Civic Data", "Urban Design"],
    projects: 12,
    faculty: 5,
  },
  {
    name: "Safe Steps Collective",
    kind: "Local NGO",
    score: 88,
    color: "#10b981",
    why: [
      "Trusted by 14 nearby schools",
      "Can gather parent voices",
      "Ready to start this month",
    ],
    capabilities: ["Community Outreach", "School Programs", "Safety Audits"],
    projects: 7,
    faculty: 3,
  },
  {
    name: "IIT Delhi Transport Lab",
    kind: "University lab",
    score: 82,
    color: "#f59e0b",
    why: [
      "Published 3 road-safety papers",
      "Has simulation infrastructure",
      "Student team available",
    ],
    capabilities: ["Simulation", "Data Analysis", "Policy Research"],
    projects: 15,
    faculty: 8,
  },
];

export default function Matches() {
  const [chosen, setChosen] = useState("");

  return (
    <AppShell
      eyebrow="Explainable AI matching"
      title="The right people are already close."
    >
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm dark:border-indigo-500/20 dark:bg-indigo-500/10">
        <Sparkles className="text-indigo-600 shrink-0" size={18} />
        <span>
          <b>We found 3 strong partners</b> for safer school crossings in Koramangala.
          Here&apos;s exactly why each is a fit.
        </span>
      </div>

      <Stagger className="grid gap-5 lg:grid-cols-3">
        {partners.map((p) => (
          <GlowCard key={p.name}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <StatusPill tone="green">{p.score}% match</StatusPill>
                  <h2 className="mt-4 text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>{p.name}</h2>
                  <p className="text-sm text-muted-foreground">{p.kind}</p>
                </div>
                <div className="relative">
                  <ScoreRing score={p.score} size={72} color={p.color} />
                  <span className="absolute inset-0 grid place-items-center text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.score}
                  </span>
                </div>
              </div>

              {/* Why this is a fit */}
              <div className="mt-5 rounded-2xl bg-muted p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Why this is a fit</p>
                <ul className="mt-3 space-y-2">
                  {p.why.map((x) => (
                    <li key={x} className="flex gap-2 text-sm">
                      <Check size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capabilities */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.capabilities.map((c) => (
                  <span key={c} className="rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    {c}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users size={13} /> {p.faculty} faculty</span>
                <span className="flex items-center gap-1"><Target size={13} /> {p.projects} projects</span>
              </div>

              <button
                onClick={() => setChosen(p.name)}
                className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  chosen === p.name
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl"
                }`}
              >
                {chosen === p.name ? "Connection requested \u2713" : "Connect this partner"}
                <ChevronRight className="ml-1 inline" size={15} />
              </button>
            </div>
          </GlowCard>
        ))}
      </Stagger>

      {/* ── Matching methodology ── */}
      <section className="mt-7 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white md:p-8">
        <div className="flex items-start gap-3">
          <ShieldCheck className="text-indigo-300 shrink-0" size={22} />
          <div>
            <h2 className="text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>How matching works</h2>
            <p className="mt-1 text-sm text-indigo-200">Transparent, explainable, human-verified.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { step: "01", title: "Capability profiling", desc: "Institutions declare domains, labs, faculty expertise, and past projects." },
            { step: "02", title: "Multi-signal scoring", desc: "Domain fit, geography, team availability, and project history are weighted." },
            { step: "03", title: "Explainable results", desc: "Every score comes with clear reasoning. AI suggests — humans decide." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm">
              <span className="text-xs font-bold text-indigo-300">{s.step}</span>
              <h3 className="mt-2 font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-5 text-indigo-200">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
