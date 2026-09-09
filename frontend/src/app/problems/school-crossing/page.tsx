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
  { date: "Today", title: "Three partners have been shortlisted", desc: "Their local presence and road-safety experience made them strong fits.", tone: "green" as const },
  { date: "Yesterday", title: "18 community voices combined", desc: "Similar reports were respectfully grouped into one clearer challenge.", tone: "indigo" as const },
  { date: "Sep 07", title: "Challenge validated", desc: "A civic reviewer confirmed the location and evidence.", tone: "amber" as const },
];

const aiInsights = {
  category: "Public Safety",
  severity: "Critical",
  confidence: 94,
  summary: "Children cross a fast-moving road outside the school every day. There is no visible zebra crossing, and buses often stop close to the gate during peak hours. This poses an immediate risk to approximately 450 students.",
  entities: ["Koramangala", "Bengaluru", "school zone", "peak hours", "bus stops"],
};

export default function Detail() {
  const [tab, setTab] = useState("Journey");
  const [supported, setSupported] = useState(false);

  return (
    <AppShell
      eyebrow="Challenge #SA-2048"
      title="Unsafe crossings near school"
      action={
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold transition-all hover:shadow-md">
          <Share2 size={16} /> Share
        </button>
      }
    >
      <Stagger>
        <div className="grid gap-7 xl:grid-cols-[1.45fr_.8fr]">
          <section>
            {/* Hero card */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              {/* Map placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 dark:from-amber-500/20 dark:via-orange-500/15 dark:to-rose-500/20">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <span className="absolute bottom-5 left-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-sm dark:bg-[#1a2236]/90 dark:text-white">
                  <MapPin className="mr-1 inline text-rose-500" size={14} /> Koramangala, Bengaluru
                </span>
                <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-sm dark:bg-[#1a2236]/90 dark:text-white">
                  12.9352\u00B0N, 77.6245\u00B0E
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex gap-2">
                    <StatusPill tone="rose">High priority</StatusPill>
                    <StatusPill tone="green">Validated</StatusPill>
                  </div>
                  <span className="text-xs text-muted-foreground">Raised 4 days ago</span>
                </div>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Children cross a fast-moving road outside the school every day. There is no visible zebra crossing, and buses often stop close to the gate during peak hours.
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
                      {["road_photo_1.jpg", "crossing_sketch.png", "parent_testimony.pdf"].map((f) => (
                        <div key={f} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                          <span className="grid size-10 place-items-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                            <FileImage size={18} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{f}</p>
                            <p className="text-xs text-muted-foreground">Uploaded 3 days ago</p>
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
                      {/* AI Summary */}
                      <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainCircuit size={16} className="text-indigo-600" />
                          <span className="text-xs font-bold text-indigo-600">AI Summary</span>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{aiInsights.summary}</p>
                      </div>

                      {/* Extracted fields */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Category", value: aiInsights.category },
                          { label: "Severity", value: aiInsights.severity },
                          { label: "AI Confidence", value: `${aiInsights.confidence}%` },
                          { label: "Affected", value: "~450 students" },
                        ].map((f) => (
                          <div key={f.label} className="rounded-xl bg-muted p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
                            <p className="mt-1 text-sm font-bold">{f.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Extracted entities */}
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
            {/* Voice count */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <StatusPill tone="rose">High priority</StatusPill>
                <span className="text-xs text-muted-foreground">18 voices</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <ScoreRing score={94} size={80} color="#6366f1" />
                  <span className="absolute inset-0 grid place-items-center text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>94</span>
                </div>
                <div>
                  <p className="text-sm font-bold">AI match confidence</p>
                  <p className="text-xs text-muted-foreground">3 institutions nearby</p>
                </div>
              </div>
            </div>

            {/* Similar challenges */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Similar challenges</p>
              <div className="mt-3 space-y-2">
                {[
                  { title: "No pedestrian crossing near temple", location: "Indiranagar", similarity: 78 },
                  { title: "Speeding vehicles near park", location: "Jayanagar", similarity: 71 },
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

            {/* Evidence summary */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Evidence attached</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { type: "Photos", count: 5 },
                  { type: "Videos", count: 1 },
                  { type: "Docs", count: 2 },
                ].map((e) => (
                  <div key={e.type} className="rounded-xl bg-muted p-3 text-center">
                    <p className="text-lg font-black" style={{ fontFamily: "var(--font-heading)" }}>{e.count}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground">{e.type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status timeline</p>
              <div className="mt-3 flex items-center gap-2">
                {["Submitted", "Validating", "Matched", "In progress"].map((s, i) => (
                  <div key={s} className="contents">
                    <div className={`grid size-8 place-items-center rounded-full text-[10px] font-bold ${
                      i <= 1 ? "bg-emerald-500 text-white" : i === 2 ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    {i < 3 && <div className={`h-0.5 flex-1 rounded ${i < 2 ? "bg-emerald-500" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-1">
                {["Submitted", "Validating", "Matched", "In progress"].map((s, i) => (
                  <span key={s} className={`flex-1 text-center text-[9px] font-semibold ${i <= 2 ? "text-emerald-600" : "text-muted-foreground"}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Stagger>
    </AppShell>
  );
}
