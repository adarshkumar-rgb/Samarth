"use client";

import Link from "next/link";
import { LocateFixed, Minus, Plus, Search, X } from "lucide-react";
import { PointerEvent, useMemo, useState } from "react";
import boundary from "@/data/geography/jharkhand-authoritative.json";
import { Problem, problems } from "@/data/mock";

type Coordinate = [number, number];
const geometry = boundary.features[0].geometry as unknown as { coordinates: Coordinate[][] };
const rings = geometry.coordinates;
const allPoints = rings.flat();
const lngs = allPoints.map(([lng]) => lng);
const lats = allPoints.map(([, lat]) => lat);
const bounds = { minLng: Math.min(...lngs), maxLng: Math.max(...lngs), minLat: Math.min(...lats), maxLat: Math.max(...lats) };
const project = (lat: number, lng: number) => ({ x: ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 1000, y: ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 650 });
const pathFor = (ring: Coordinate[]) => ring.map(([lng, lat], index) => { const { x, y } = project(lat, lng); return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ") + " Z";

export function ProblemMap({ compact = false }: { compact?: boolean }) {
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Problem | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const visible = useMemo(() => problems.filter((problem) => (category === "All" || problem.category === category) && `${problem.title} ${problem.city}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const clustered = zoom < 2;
  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => { if (!dragStart || compact) return; setPan({ x: pan.x + event.clientX - dragStart.x, y: pan.y + event.clientY - dragStart.y }); setDragStart({ x: event.clientX, y: event.clientY }); };
  return <section className={`map-frame ${compact ? "map-frame-compact" : ""}`} aria-label="Interactive Jharkhand problem map">
    {!compact && <div className="map-controls"><label className="map-search"><Search size={15}/><input aria-label="Search Jharkhand location or problem" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a Jharkhand place or challenge"/></label><div className="map-filters" aria-label="Problem category filters">{["All", "Safety", "Water", "Sanitation", "Infrastructure", "Healthcare"].map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}</div></div>}
    <svg className="jharkhand-map" viewBox="0 0 1000 650" role="img" aria-label="Authoritative Jharkhand state boundary with community problem markers" onPointerDown={(event) => !compact && setDragStart({ x: event.clientX, y: event.clientY })} onPointerMove={onPointerMove} onPointerUp={() => setDragStart(null)} onPointerLeave={() => setDragStart(null)}>
      <g transform={`translate(${pan.x / Math.max(1, zoom)}, ${pan.y / Math.max(1, zoom)}) scale(${zoom})`}><g className="jharkhand-boundary">{rings.map((ring, index) => <path key={index} d={pathFor(ring)}/>)}</g>{!clustered && visible.map((problem) => { const point = project(problem.coordinates.lat, problem.coordinates.lng); return <g key={problem.id} className={`jharkhand-marker ${problem.severity === "Critical" ? "critical" : ""}`} transform={`translate(${point.x} ${point.y})`} onClick={() => setSelected(problem)} role="button" tabIndex={0} aria-label={`View ${problem.title}`} onKeyDown={(event) => event.key === "Enter" && setSelected(problem)}><circle r="12"/><circle className="marker-core" r="4"/></g>; })}{clustered && <><g className="jharkhand-cluster" transform="translate(430 350)" role="button" tabIndex={0} aria-label="Zoom into Ranchi and Bokaro challenges" onClick={() => setZoom(2)} onKeyDown={(event) => event.key === "Enter" && setZoom(2)}><circle r="26"/><text y="5" textAnchor="middle">31</text></g><g className="jharkhand-cluster" transform="translate(640 210)" role="button" tabIndex={0} aria-label="Zoom into Deoghar and Dumka challenges" onClick={() => setZoom(2)} onKeyDown={(event) => event.key === "Enter" && setZoom(2)}><circle r="26"/><text y="5" textAnchor="middle">19</text></g></>}</g>
    </svg>
    <div className="map-place ranchi">RANCHI</div><div className="map-place jamshedpur">JAMSHEDPUR</div><div className="map-place deoghar">DEOGHAR</div><div className="map-place dumka">DUMKA</div>
    <div className="map-zoom"><button onClick={() => setZoom(Math.min(2.2, zoom + .35))} aria-label="Zoom in"><Plus size={16}/></button><button onClick={() => setZoom(Math.max(1, zoom - .35))} aria-label="Zoom out"><Minus size={16}/></button><button onClick={() => { setZoom(2); setPan({ x: 0, y: 0 }); }} aria-label="Focus Jharkhand problems"><LocateFixed size={16}/></button></div>
    {selected && <aside className="map-preview"><button onClick={() => setSelected(null)} aria-label="Close problem preview"><X size={16}/></button><p className="eyebrow">Problem {selected.id}</p><h3>{selected.title}</h3><p>{selected.location}</p><div className="preview-stats"><b>{selected.severity}</b><span>{selected.reports} reports</span><span>{selected.match}% match</span></div><Link href={`/problems/${selected.slug}`}>View challenge →</Link></aside>}
    <p className="map-attribution">Boundary: geoBoundaries gbOpen IND ADM1, sourced from DataMeet India community / Election Commission of India.</p>
  </section>;
}
