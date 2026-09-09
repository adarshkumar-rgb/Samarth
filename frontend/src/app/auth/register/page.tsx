"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, UserRound, Building2, GraduationCap, Users } from "lucide-react";
import { useState } from "react";

const roles = [
  { label: "Community member", icon: <Users size={18} />, desc: "Report problems in your area" },
  { label: "Institution / NGO", icon: <Building2 size={18} />, desc: "Match challenges to your capabilities" },
  { label: "Government partner", icon: <GraduationCap size={18} />, desc: "Validate and prioritize challenges" },
  { label: "Builder / student", icon: <UserRound size={18} />, desc: "Form teams and build solutions" },
];

export default function Register() {
  const [role, setRole] = useState(roles[0].label);

  return (
    <main className="min-h-screen bg-[var(--background)] p-5">
      <nav className="mx-auto flex max-w-5xl justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 font-black text-white shadow-lg shadow-indigo-500/30">S</span>
          <b className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>Samarth</b>
        </Link>
        <p className="text-sm text-muted-foreground">
          Already in? <Link href="/auth/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Sign in</Link>
        </p>
      </nav>

      <div className="mx-auto mt-10 grid max-w-5xl gap-7 lg:grid-cols-[.8fr_1.2fr]">
        {/* Left visual */}
        <aside className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-7 text-white">
          <UserRound size={25} />
          <h1 className="mt-8 text-3xl font-black leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Find your place in the change.
          </h1>
          <div className="mt-8 space-y-5">
            {["One profile, plain-language guidance", "Join only the challenges that matter to you", "Track real-world progress, together"].map((x) => (
              <p key={x} className="flex gap-3 text-sm leading-6 text-indigo-100">
                <CheckCircle2 className="shrink-0 text-emerald-300" size={18} />
                {x}
              </p>
            ))}
          </div>
        </aside>

        {/* Right form */}
        <section className="rounded-3xl border border-border bg-card p-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">Step 1 of 2</p>
          <h2 className="mt-2 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>How will you contribute?</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {roles.map((r) => (
              <button
                key={r.label}
                onClick={() => setRole(r.label)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  role === r.label
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-300 ring-2 ring-indigo-500/10"
                    : "border-border text-muted-foreground hover:border-indigo-300"
                }`}
              >
                <span className="text-indigo-600">{r.icon}</span>
                <p className="mt-2 text-sm font-bold">{r.label}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>

          <label className="mt-7 block text-sm font-bold">
            Your name
            <input
              placeholder="e.g. Aarav Kumar"
              className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </label>

          <label className="mt-5 block text-sm font-bold">
            Email address
            <input
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </label>

          <label className="mt-5 block text-sm font-bold">
            Create password
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </label>

          <Link
            href="/dashboard"
            className="mt-7 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Create account <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
