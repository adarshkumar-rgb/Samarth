"use client";
import { Camera, CheckCircle2, ChevronRight, MapPin, Mic, Sparkles, ArrowRight, FileImage, Video, File } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/samarth/app-shell";
import Link from "next/link";
import { useDemo } from "@/components/samarth/demo-store";

const steps = ["Describe the problem", "Add location & evidence", "Review & submit"];

export default function RaiseChallenge() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const { addChallenge } = useDemo();

  const submit = () => {
    addChallenge({
      title: desc.length > 55 ? desc.slice(0, 55) + "\u2026" : desc,
      description: desc,
      location: location || "Koramangala, Bengaluru",
      category: "Community need",
    });
    setSent(true);
  };

  return (
    <AppShell eyebrow="Guided submission" title="What needs to change?">
      <div className="grid gap-7 xl:grid-cols-[1.3fr_.7fr]">
        {/* Main form */}
        <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
          {sent ? (
            <div className="py-14 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
                <CheckCircle2 size={32} />
              </span>
              <h2 className="mt-5 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                Your signal is now moving.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                We created this challenge and saved it in your demo workspace. It is now waiting for review.
              </p>
              <div className="mt-7 flex justify-center gap-3">
                <button onClick={() => { setSent(false); setDesc(""); setLocation(""); setStep(0); }}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-bold transition-all hover:shadow-md">
                  Raise another
                </button>
                <Link href="/dashboard" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
                  See my workspace
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="mb-7 flex items-center gap-2">
                {steps.map((s, i) => (
                  <div key={s} className="contents">
                    <div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                      i === step
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                        : i < step
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {i < step ? <CheckCircle2 size={14} /> : <span className="grid size-5 place-items-center rounded-full bg-current/10 text-[10px]">{i + 1}</span>}
                      {s}
                    </div>
                    {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-emerald-500" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div>
                  <div className="mb-7 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                      <Sparkles size={19} />
                    </span>
                    <div>
                      <p className="font-bold">Tell it in your own words</p>
                      <p className="text-xs text-muted-foreground">No technical language needed — we&apos;ll structure it for you.</p>
                    </div>
                  </div>
                  <label className="text-sm font-bold">What is happening?</label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Example: Children have to cross a fast road near the school, and there is no marked crossing..."
                    className="mt-2 min-h-40 w-full resize-none rounded-2xl border border-border bg-muted px-4 py-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{desc.length} characters</span>
                    <button
                      onClick={() => setStep(1)}
                      disabled={!desc.trim()}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next step <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-7 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
                      <MapPin size={19} />
                    </span>
                    <div>
                      <p className="font-bold">Where is this happening?</p>
                      <p className="text-xs text-muted-foreground">A general location is fine — we&apos;ll help narrow it down.</p>
                    </div>
                  </div>
                  <label className="text-sm font-bold">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Koramangala, Bengaluru"
                    className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <p className="mt-6 text-sm font-bold">Evidence (optional)</p>
                  <p className="text-xs text-muted-foreground mb-3">Photos, videos, or documents help validate the problem.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <Camera size={18} />, label: "Photo" },
                      { icon: <Video size={18} />, label: "Video" },
                      { icon: <File size={18} />, label: "Document" },
                    ].map((e) => (
                      <button key={e.label} className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border p-5 text-muted-foreground transition-all hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/5">
                        {e.icon}
                        <span className="text-xs font-bold">{e.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button onClick={() => setStep(0)} className="rounded-xl border border-border px-5 py-3 text-sm font-bold transition-all hover:shadow-md">
                      Back
                    </button>
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl">
                      Review <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-black text-lg" style={{ fontFamily: "var(--font-heading)" }}>Review your submission</h3>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-xs font-bold text-muted-foreground">Problem description</p>
                      <p className="mt-1 text-sm">{desc}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-xs font-bold text-muted-foreground">Location</p>
                      <p className="mt-1 text-sm">{location || "Koramangala, Bengaluru"}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-xs font-bold text-muted-foreground">Evidence</p>
                      <p className="mt-1 text-sm text-muted-foreground">No files attached (you can add them later)</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-indigo-50 p-3 dark:bg-indigo-500/10">
                    <p className="text-xs font-bold text-indigo-600"><Sparkles className="inline mr-1" size={14} /> AI will automatically:</p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• Categorize the problem</li>
                      <li>• Estimate severity</li>
                      <li>• Find similar existing challenges</li>
                      <li>• Suggest matching institutions</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button onClick={() => setStep(1)} className="rounded-xl border border-border px-5 py-3 text-sm font-bold transition-all hover:shadow-md">
                      Back
                    </button>
                    <button onClick={submit} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl">
                      <CheckCircle2 size={16} /> Submit challenge
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="font-black" style={{ fontFamily: "var(--font-heading)" }}>What happens next?</h3>
            <div className="mt-4 space-y-4">
              {[
                { step: "1", title: "AI structures your words", desc: "Categorizes, summarizes, and extracts key details.", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15" },
                { step: "2", title: "Similar challenges are checked", desc: "We find existing problems to avoid duplicates.", color: "bg-violet-100 text-violet-600 dark:bg-violet-500/15" },
                { step: "3", title: "A reviewer validates it", desc: "A human confirms the location and evidence.", color: "bg-amber-100 text-amber-600 dark:bg-amber-500/15" },
                { step: "4", title: "Matching begins", desc: "Institutions are notified if capabilities align.", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-xl text-xs font-bold ${s.color}`}>{s.step}</span>
                  <div>
                    <p className="text-sm font-bold">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white">
            <p className="text-sm font-bold">Tips for a strong submission</p>
            <ul className="mt-3 space-y-2 text-xs text-indigo-100">
              <li>• Describe the problem, not the solution</li>
              <li>• Mention who is affected</li>
              <li>• Photos and videos help enormously</li>
              <li>• One problem per submission</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
