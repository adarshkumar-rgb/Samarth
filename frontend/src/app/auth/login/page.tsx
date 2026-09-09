"use client";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-2">
      {/* Left visual panel */}
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#151948] via-[#1a1f5c] to-[#292681] p-12 text-white lg:block">
        <div className="absolute -right-24 top-24 size-96 rounded-full bg-violet-500/30 blur-3xl animate-float" />
        <div className="absolute bottom-24 left-24 size-64 rounded-full bg-indigo-500/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Link href="/" className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-white font-black text-indigo-700">S</span>
          <b className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>Samarth</b>
        </Link>

        <div className="relative mt-44 max-w-lg">
          <p className="text-sm font-bold text-indigo-300">WELCOME BACK</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Good change starts with a familiar face.
          </h1>
          <p className="mt-5 text-lg leading-8 text-indigo-100">
            Pick up the challenge you were moving — or find a new one that needs you.
          </p>
        </div>

        <div className="absolute bottom-12 flex items-center gap-3 text-sm text-indigo-200">
          <Sparkles size={17} /> 2,431 community signals and counting
        </div>
      </section>

      {/* Right form panel */}
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-2xl bg-indigo-600 font-black text-white">S</span>
            <b className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>Samarth</b>
          </Link>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Your impact workspace
          </p>
          <h2 className="mt-3 text-3xl font-black" style={{ fontFamily: "var(--font-heading)" }}>Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Use the demo to explore every workflow.</p>

          <div className="mt-8 space-y-5">
            <label className="block text-sm font-bold">
              Email address
              <input
                defaultValue="aarav@samarth.demo"
                className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            <label className="block text-sm font-bold">
              Password
              <div className="relative mt-2">
                <input
                  type={show ? "text" : "password"}
                  defaultValue="demo1234"
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </div>

          <Link
            href="/dashboard"
            className="mt-7 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Sign in <ArrowRight size={16} />
          </Link>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/auth/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Create an account
            </Link>
          </p>

          <div className="mt-10 rounded-2xl bg-muted p-4 text-xs text-muted-foreground">
            <b className="text-foreground">Demo mode:</b> All credentials are pre-filled. Just click &ldquo;Sign in&rdquo; to explore the platform.
          </div>
        </div>
      </section>
    </main>
  );
}
