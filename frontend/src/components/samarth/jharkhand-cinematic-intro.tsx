"use client";

import { useEffect, useMemo, useState } from "react";
import boundary from "@/data/geography/jharkhand-authoritative.json";

const duration = 4500;
type Point = [number, number];
const ring = (boundary.features[0].geometry as unknown as { coordinates: Point[][] }).coordinates[0];
const lng = ring.map(([x]) => x), lat = ring.map(([, y]) => y);
const box = { minLng: Math.min(...lng), maxLng: Math.max(...lng), minLat: Math.min(...lat), maxLat: Math.max(...lat) };
const point = (latitude:number, longitude:number) => [((longitude-box.minLng)/(box.maxLng-box.minLng))*620, ((box.maxLat-latitude)/(box.maxLat-box.minLat))*460] as const;
const path = ring.map(([longitude, latitude], i) => { const [x,y]=point(latitude,longitude); return `${i ? "L":"M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ")+" Z";

/** Adapted from the supplied India Cinematic Intro: same pin, ripple, draw and fade timeline; Jharkhand-only geography. */
export function JharkhandCinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [time,setTime]=useState(0); const [skip,setSkip]=useState(false);
  useEffect(()=>{ if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onFinish(); return; } const started=performance.now(); let id=0; const frame=(now:number)=>{const next=now-started; if(next>=duration){onFinish();return;} setTime(next);id=requestAnimationFrame(frame);};id=requestAnimationFrame(frame);return()=>cancelAnimationFrame(id);},[onFinish]);
  useEffect(()=>{if(skip) onFinish();},[skip,onFinish]);
  const progress=Math.min(1,time/duration), draw=Math.max(0,Math.min(1,(time-1050)/2000)), ripple=Math.max(0,Math.min(1,(time-700)/1200)), out=Math.max(0,Math.min(1,(time-3400)/1100));
  const dash=useMemo(()=>2600,[ ]); const [pinX,pinY]=point(23.35,85.33); const pinOffset=time<850?-270*(1-time/850)**2:time<1200?-22*Math.sin(((time-850)/350)*Math.PI):0;
  return <section className="cinematic-intro" aria-label="Samarth opening animation"><button onClick={()=>setSkip(true)} className="cinematic-skip">Skip intro</button><div className="cinematic-title" style={{opacity:Math.min(1,time/700)}}><span>SAMARTH</span><small>Jharkhand community network</small></div><svg viewBox="0 0 620 460" className="cinematic-map" style={{opacity:1-out,transform:`translate(${out*120}px,${-out*45}px) scale(${1-out*.32})`}} aria-hidden="true"><path d={path} className="cinematic-outline" style={{strokeDasharray:dash,strokeDashoffset:dash*(1-draw)}}/>{ripple>0&&[0, .24].map((delay)=>{const p=Math.max(0,(ripple-delay)/(1-delay));return p>0?<circle key={delay} cx={pinX} cy={pinY} r={10+p*180} className="cinematic-ripple" style={{opacity:(1-p)*.55}}/>:null;})}<g transform={`translate(${pinX} ${pinY+pinOffset})`}><path d="M0 0 L-13 -24 A16 16 0 1 1 13 -24 Z" className="cinematic-pin"/><circle cx="0" cy="-31" r="4" fill="#f7f7f4"/></g></svg><p className="cinematic-progress">{String(Math.round(progress*100)).padStart(2,"0")} / 100</p></section>;
}
