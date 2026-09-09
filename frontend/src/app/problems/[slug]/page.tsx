import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { problems, projectStages } from "@/data/mock";

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = problems.find((item) => item.slug === slug);
  if (!problem) notFound();
  const metrics = [[problem.severity, "Severity"], [`${problem.reports}`, "Community reports"], [`${problem.confidence}%`, "AI confidence"], [problem.status, "Project status"]];
  return <main className="min-h-screen bg-background">
    <header className="flex items-center justify-between border-b border-border px-5 py-5 md:px-10"><Link href="/map" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]"><ArrowLeft size={15}/> Problem network</Link><Link href="/" className="font-mono text-xs tracking-[.18em]">SAMARTH</Link></header>
    <article className="mx-auto max-w-6xl px-5 py-12 md:px-10"><p className="eyebrow">Problem {problem.id}</p><h1 className="editorial mt-5 max-w-4xl text-6xl leading-[.9] md:text-8xl">{problem.title}</h1><p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider"><MapPin size={14}/>{problem.location}</p>
      <div className="mt-12 grid border-y border-border sm:grid-cols-4">{metrics.map(([value,label]) => <div key={label} className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-5 last:border-r-0"><b className="editorial block text-3xl">{value}</b><span className="eyebrow mt-2 block text-muted-foreground">{label}</span></div>)}</div>
      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_.8fr]"><div><p className="eyebrow">AI structured brief</p><p className="mt-4 text-xl leading-8">{problem.statement}</p><p className="eyebrow mt-10">Evidence & context</p><p className="mt-3 text-sm text-muted-foreground">{problem.evidence}</p></div><aside className="border border-border p-6"><p className="eyebrow">Matched institution</p><h2 className="editorial mt-4 text-3xl">{problem.institution}</h2><b className="mt-6 block font-mono text-4xl">{problem.match}%</b><p className="mt-2 text-sm text-muted-foreground">Capability match</p><Link href="/matches" className="mt-8 inline-block border-b border-foreground pb-1 text-xs font-bold uppercase tracking-[.12em]">Review match <ArrowRight className="inline" size={14}/></Link></aside></div>
      <section className="mt-16 border-t border-border pt-8"><p className="eyebrow">Project lifecycle</p><div className="mt-6 grid gap-px bg-border sm:grid-cols-7">{projectStages.map((stage, index) => <div key={stage} className={`min-h-24 p-3 ${index < 3 ? "bg-foreground text-background" : "bg-background"}`}><span className="font-mono text-xs">0{index + 1}</span><p className="mt-5 text-xs font-bold uppercase tracking-wider">{stage}</p></div>)}</div></section>
    </article>
  </main>;
}
