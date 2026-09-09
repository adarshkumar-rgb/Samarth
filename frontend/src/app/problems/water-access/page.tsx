"use client";
import Link from "next/link";
import {
  CheckCircle2, ChevronRight, Clock3, FileImage, Flag, MapPin,
  MessageCircle, Share2, UsersRound, AlertTriangle, Building2,
  BrainCircuit, TrendingUp, ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "@/components/samarth/app-shell";
import { Stagger, AnimatedBar, ScoreRing } from "@/components/samarth/animated";

const updates = [
  { date: "Today", title: "Pilot phase initiated", desc: "Community agreed on a temporary water distribution point near the colony park.", tone: "green" as const },
  { date: "Yesterday", title: "Pipeline feasibility study complete", desc: "Survey covered 40% of the colony. Extension plan drafted.", tone: "indigo" as const },
  { date: "Sep 05", title: "Challenge validated", desc: "On-ground verification confirmed acute water shortage during summer.", tone: "amber" as const },
];

const aiInsights = {
  category: "Water & Sanitation",
  severity: "High",
  confidence: 91,
  summary: "Residents in Dharavi walk long distances for reliable water access during peak summer months. The existing pipeline covers only 40% of the colony. The issue recurs annually and affects approximately 2,000 households.",
  entities: ["Dharavi", "Mumbai", "pipeline", "summer months", "40% coverage"],
};

export default function WaterAccess() {
  const [tab, setTab] = useState("Journey");
  const [supported, setSupported] = useState(false);

  return (
    <AppShell
      eyebrow="Challenge #SA-2031"
      title="Summer water gaps"
      action={
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold transition-all hover:shadow-md">
          <Share2 size={16} /> Share
        </button>
      }
    >
      <Stagger>
        <div className="grid gap-7 xl:grid-cols-[1.45fr_.8fr]">
          <section>
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              {/* Map placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 dark:from-cyan-500/20 dark:via-blue-500/15 dark:to-indigo-500/20">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <span className="absolute bottom-5 left-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-sm dark:bg-[#1a2236]/90 dark:text-white">
                  <MapPin className="mr-1 inline text-cyan-500" size={14} /> Dharavi, Mumbai
                </span>
                <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-sm dark:bg-[#1a2236]/90 dark:text-white">
                  19.0438\u00B0N, 72.8534\u00B0E
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex gap-2">
                    <StatusPill tone="amber">High priority</StatusPill>
                    <StatusPill tone="green">In progress</StatusPill>
                  </div>
                  <span className="text-xs text-muted-foreground">Raised 2 days ago</span>
                </div>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Residents walk long distances for reliable water access during peak summer months. The existing pipeline covers only 40% of the colony, and the problem recurs annually.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSupported(!supported)}
                    className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                      supported
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                    }`}
                  >
                    <UsersRound className="mr-1 inline" size={16} />
                    {supported ? "You're supporting this" : "Add your voice"}
                  </button>
                  <button className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold transition-all hover:shadow-md">
                    <MessageCircle className="mr-1 inline" size={16} /> Comment
                  </button>
                </div>

                {/* Tabs */}
                <div className="mt-7 flex gap-1 rounded-xl bg-muted p-1">
                  {["Journey", "Evidence", "AI Intelligence"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                        tab === t
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="mt-5">
                  {tab === "Journey" && (
                    <div className="space-y-0">
                      {updates.map((u, i) => (
                        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className={`grid size-8 place-items-center rounded-full ${
                              i === 0 ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"
                            }`}>
                              {i === 0 ? <TrendingUp size={14} /> : <CheckCircle2 size={14} />}
                            </div>
                            {i < updates.length - 1 && <div className="mt-1 h-full w-0.5 bg-border" />}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{u.date}</p>
                            <p className="mt-1 font-bold text-sm">{u.title}</p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">{u.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "Evidence" && (
                    <div className="space-y-3">
                      {["water_queue_photo.jpg", "pipeline_map.pdf", "resident_interview.mp4"].map((f) => (
                        <div key={f} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                          <span className="grid size-10 place-items-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                            <FileImage size={18} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{f}</p>
                            <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                          </div>
                          <button className="rounded-lg bg-card border border-border p-2 text-muted-foreground transition-all hover:shadow-md">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "AI Intelligence" && (
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainCircuit size={16} className="text-indigo-600" />
                          <span className="text-xs font-bold text-indigo-600">AI Summary</span>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{aiInsights.summary}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Category", value: aiInsights.category },
                          { label: "Severity", value: aiInsights.severity },
                          { label: "AI Confidence", value: `${aiInsights.confidence}%` },
                          { label: "Affected", value: "~2,000 households" },
                        ].map((f) => (
                          <div key={f.label} className="rounded-xl bg-muted p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
                            <p className="mt-1 text-sm font-bold">{f.value}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground mb-2">Extracted entities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {aiInsights.entities.map((e) => (
                            <span key={e} className="rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Right sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <StatusPill tone="amber">High priority</StatusPill>
                <span className="text-xs text-muted-foreground">32 voices</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <ScoreRing score={91} size={80} color="#f59e0b" />
                  <span className="absolute inset-0 grid place-items-center text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>91</span>
                </div>
                <div>
                  <p className="text-sm font-bold">AI match confidence</p>
                  <p className="text-xs text-muted-foreground">2 institutions nearby</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Similar challenges</p>
              <div className="mt-3 space-y-2">
                {[
                  { title: "No piped water in new colony", location: "Andheri West", similarity: 82 },
                  { title: "Tanker dependency in summer", location: "Bandra East", similarity: 74 },
                ].map((s) => (
                  <div key={s.title} className="rounded-xl bg-muted p-3 transition-colors hover:bg-accent cursor-pointer">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground"><MapPin className="inline" size={11} /> {s.location}</span>
                      <span className="text-[10px] font-bold text-indigo-600">{s.similarity}% similar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Evidence attached</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { type: "Photos", count: 8 },
                  { type: "Videos", count: 2 },
                  { type: "Docs", count: 3 },
                ].map((e) => (
                  <div key={e.type} className="rounded-xl bg-muted p-3 text-center">
                    <p className="text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>{e.count}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground">{e.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Stagger>
    </AppShell>
  );
}
