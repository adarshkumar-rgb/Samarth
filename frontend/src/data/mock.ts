export type Severity = "Critical" | "High" | "Medium";
export type ProblemStatus = "Validated" | "Matched" | "Team forming" | "In progress";

export type Problem = {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  category: string;
  severity: Severity;
  status: ProblemStatus;
  reports: number;
  confidence: number;
  coordinates: { lat: number; lng: number };
  statement: string;
  evidence: string;
  institution: string;
  match: number;
};

export const statistics = [
  { value: "2,431", label: "Community signals" },
  { value: "156", label: "Active challenges" },
  { value: "89", label: "Matched institutions" },
  { value: "34", label: "Solutions in progress" },
];

export const problems: Problem[] = [
  { id: "0248", slug: "school-crossing", title: "Unsafe school crossing", location: "Kanke · Ranchi", city: "Ranchi", category: "Safety", severity: "Critical", status: "Team forming", reports: 26, confidence: 94, coordinates: { lat: 23.42, lng: 85.33 }, statement: "Children cross an unmarked, fast-moving corridor near the school gate during opening and closing times. Parents have reported repeated near misses.", evidence: "26 reports · 9 location-verified images · school-gate observation", institution: "BIT Mesra Mobility Lab", match: 94 },
  { id: "0191", slug: "water-access", title: "Irregular drinking-water supply", location: "Madhupur · Deoghar", city: "Deoghar", category: "Water", severity: "High", status: "Matched", reports: 31, confidence: 91, coordinates: { lat: 24.28, lng: 86.65 }, statement: "Households report irregular supply and long collection queues during the summer months, especially in peripheral wards.", evidence: "31 reports · 3 ward meetings · supply schedule review", institution: "Deoghar Civic Water Cell", match: 89 },
  { id: "0312", slug: "sanitation", title: "Blocked community drainage", location: "Jharia · Dhanbad", city: "Dhanbad", category: "Sanitation", severity: "High", status: "Validated", reports: 19, confidence: 90, coordinates: { lat: 23.74, lng: 86.42 }, statement: "Open drains remain blocked after rain, creating standing water near homes and a primary school.", evidence: "19 reports · monsoon walk-through · ward photographs", institution: "Dhanbad Engineering College", match: 87 },
  { id: "0307", slug: "street-lighting", title: "Unlit bus-stop approach", location: "Bokaro Steel City · Bokaro", city: "Bokaro", category: "Infrastructure", severity: "High", status: "Validated", reports: 24, confidence: 89, coordinates: { lat: 23.67, lng: 86.15 }, statement: "A heavily used evening route between the bus stop and residential lanes has non-functional street lighting.", evidence: "24 reports · night safety audit · maintenance log", institution: "Bokaro Institute of Technology", match: 90 },
  { id: "0284", slug: "waste-collection", title: "Missed waste collection", location: "Mango · Jamshedpur", city: "Jamshedpur", category: "Sanitation", severity: "Medium", status: "In progress", reports: 17, confidence: 92, coordinates: { lat: 22.80, lng: 86.22 }, statement: "Households report inconsistent collection and open dumping near a community playground.", evidence: "17 reports · route audit · recurring photo evidence", institution: "XLRI Civic Innovation Cell", match: 87 },
  { id: "0276", slug: "health-access", title: "Primary-health access gap", location: "Dumka Sadar · Dumka", city: "Dumka", category: "Healthcare", severity: "Medium", status: "Matched", reports: 14, confidence: 85, coordinates: { lat: 24.27, lng: 87.25 }, statement: "Residents report long travel times and unclear referral information for essential primary-health services.", evidence: "14 reports · community health meeting", institution: "Sido Kanhu Murmu University", match: 82 },
];

export const matches = [
  { name: "BIT Mesra Mobility Lab", type: "Research institution", score: 94, capabilities: [["Transport safety", 92], ["Civic data analytics", 85], ["Urban planning", 78], ["Student innovation", 88]], why: "Relevant road-safety research, Ranchi civic partnerships and an available student team." },
  { name: "Ranchi Road Safety Collective", type: "Community partner", score: 88, capabilities: [["School programmes", 93], ["Community outreach", 91], ["Safety audits", 80], ["Volunteer network", 86]], why: "Trusted by local schools and ready to gather parent voices this month." },
  { name: "NIT Jamshedpur Urban Lab", type: "University lab", score: 82, capabilities: [["Road research", 89], ["Simulation", 84], ["Data analysis", 82], ["Student innovation", 76]], why: "Strong civic engineering capability with a student team available for a Jharkhand pilot." },
] as const;

export const projectStages = ["Problem", "Matched", "Team formed", "Prototype", "Pilot", "Deployed", "Impact"];
