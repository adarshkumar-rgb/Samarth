"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Bell, ChevronRight, CircleHelp, Command, LayoutDashboard,
  Lightbulb, Map, Menu, Moon, Network, Plus, Search, ShieldCheck,
  Sparkles, University, X,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useDemo } from "./demo-store";
import { PulseDot } from "./animated";

const navigation = [
  { href: "/dashboard", label: "Command centre", icon: LayoutDashboard },
  { href: "/map", label: "Problem map", icon: Map },
  { href: "/problems/new", label: "Raise a challenge", icon: Plus },
  { href: "/matches", label: "AI matches", icon: Network },
  { href: "/projects", label: "Live projects", icon: Lightbulb },
  { href: "/admin", label: "Validation desk", icon: ShieldCheck },
  { href: "/hei", label: "Institution portal", icon: University },
];

export function AppShell({
  title, eyebrow, children, action,
}: {
  title: string; eyebrow: string; children: ReactNode; action?: ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const { notifications, clearNotifications, challenges } = useDemo();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-foreground">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col border-r border-border bg-[var(--background)] px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-9 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-foreground text-lg font-black text-background">S</span>
            <span>
              <b className="block text-lg tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>Samarth</b>
              <small className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Impact network</small>
            </span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-muted-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                onClick={() => setOpen(false)}
                href={href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon size={18} className={active ? "text-white" : ""} />
                {label}
                {active && (
                  <ChevronRight className="ml-auto text-white/70" size={14} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Help card */}
          <div className="border border-border p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold">
            <CircleHelp size={17} /> Need a hand?
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Your guided tour explains every step in plain language.
          </p>
          <button
            onClick={() => setTourOpen(true)}
            className="mt-3 text-xs font-bold underline underline-offset-4 transition-colors"
          >
            Start tour
          </button>
        </div>
      </aside>

      {/* ── Mobile overlay ── */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ── Main area ── */}
      <main className="min-h-screen lg:pl-[272px]">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center gap-4 border-b border-border bg-[var(--background)] px-5 md:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden text-foreground">
            <Menu />
          </button>

          {/* Search bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm text-muted-foreground shadow-sm transition hover:shadow-md md:flex"
          >
            <Search size={16} />
            Search challenges, places or people
            <kbd className="ml-auto rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
              <Command size={9} className="inline" /> K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Moon size={18} />
            </button>

            <button
              onClick={() => setAlertsOpen(!alertsOpen)}
              aria-label="Show notifications"
              className="relative grid size-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute right-2 top-2 flex items-center gap-0.5">
                  <PulseDot color="bg-rose-500" />
                </span>
              )}
            </button>

            <div className="hidden items-center gap-2.5 sm:flex">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-black text-white shadow-md shadow-amber-500/20">
                AK
              </span>
              <span className="text-sm font-semibold">Aarav</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-1 text-muted-foreground">
                {eyebrow}
              </p>
              <h1
                className="text-2xl font-black tracking-tight md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h1>
            </div>
            {action}
          </div>
          {children}
        </div>
      </main>

      {/* ── Notifications panel ── */}
      {alertsOpen && (
        <div className="fixed right-5 top-[84px] z-50 w-[360px] rounded-2xl border border-border bg-card p-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <b className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>Notifications</b>
            <button onClick={clearNotifications} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
              Clear all
            </button>
          </div>
          {notifications.length ? (
            <div className="mt-3 space-y-2">
              {notifications.map((x, i) => (
                <div key={i} className="rounded-xl bg-muted p-3 text-sm leading-5">
                  {x}
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">You&apos;re all caught up.</p>
          )}
        </div>
      )}

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 grid place-items-start bg-slate-950/50 p-5 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl rounded-2xl bg-card p-4 shadow-2xl border border-border">
            <input autoFocus placeholder="Search challenges or places…" className="w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Suggestions</p>
            {challenges.slice(0, 4).map((x) => (
              <Link onClick={() => setSearchOpen(false)} href={`/problems/${x.id}`} key={x.id} className="mt-2 block rounded-xl p-3 transition-colors hover:bg-accent">
                <b className="block text-sm">{x.title}</b>
                <span className="text-xs text-muted-foreground">{x.location} · {x.status}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Tour modal ── */}
      {tourOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/60 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-7 shadow-2xl border border-border">
            <span className="grid size-11 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15">
              <Sparkles />
            </span>
            <h2 className="mt-5 text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
              Samarth, in 60 seconds
            </h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
              <li className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15">1</span>
                <span><b className="text-foreground">Raise</b> a need in ordinary language.</span>
              </li>
              <li className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15">2</span>
                <span><b className="text-foreground">Understand</b> its impact pulse and matching reasons.</span>
              </li>
              <li className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15">3</span>
                <span><b className="text-foreground">Follow</b> an open, human-verified journey to delivery.</span>
              </li>
            </ol>
            <button onClick={() => setTourOpen(false)} className="mt-7 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30">
              Let&apos;s go
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "indigo",
}: {
  children: ReactNode;
  tone?: "indigo" | "green" | "amber" | "rose";
}) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${tones[tone]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
