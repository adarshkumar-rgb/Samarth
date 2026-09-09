"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Challenge = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  voices: number;
  status: "Validating" | "Matched" | "In progress" | "Deployed";
  created: string;
  lat?: number;
  lng?: number;
  aiConfidence?: number;
};

type Store = {
  challenges: Challenge[];
  notifications: string[];
  addChallenge: (input: Omit<Challenge, "id" | "voices" | "status" | "created" | "severity" | "aiConfidence">) => void;
  addVoice: (id: string) => void;
  markMatched: (id: string) => void;
  clearNotifications: () => void;
};

const seed: Challenge[] = [
  {
    id: "school-crossing",
    title: "Unsafe school crossing",
    description: "Children cross a fast-moving road outside the school every day. There is no visible zebra crossing, and buses often stop close to the gate during peak hours.",
    location: "Kanke, Ranchi",
    category: "Safety",
    severity: "Critical",
    voices: 18,
    status: "Matched",
    created: "4 days ago",
    lat: 12.9352,
    lng: 77.6245,
    aiConfidence: 94,
  },
  {
    id: "water-access",
    title: "Irregular drinking-water supply",
    description: "Residents walk long distances for reliable water access during peak summer months. The existing pipeline covers only 40% of the colony.",
    location: "Madhupur, Deoghar",
    category: "Water",
    severity: "High",
    voices: 32,
    status: "In progress",
    created: "2 days ago",
    lat: 19.0438,
    lng: 72.8534,
    aiConfidence: 91,
  },
  {
    id: "sanitation",
    title: "Blocked community drainage",
    description: "Open drains remain blocked after rain, creating standing water near homes and a primary school.",
    location: "Jharia, Dhanbad",
    category: "Environment",
    severity: "Medium",
    voices: 12,
    status: "Validating",
    created: "6 hours ago",
    lat: 18.5679,
    lng: 73.9143,
    aiConfidence: 87,
  },
  {
    id: "street-lighting",
    title: "Unlit bus-stop approach",
    description: "A heavily used evening route between the bus stop and residential lanes has non-functional street lighting.",
    location: "Bokaro Steel City, Bokaro",
    category: "Infrastructure",
    severity: "Medium",
    voices: 24,
    status: "In progress",
    created: "1 week ago",
    lat: 12.9116,
    lng: 77.6389,
    aiConfidence: 89,
  },
  {
    id: "waste-collection",
    title: "Missed waste collection",
    description: "Households report inconsistent collection and open dumping near a community playground.",
    location: "Mango, Jamshedpur",
    category: "Environment",
    severity: "High",
    voices: 15,
    status: "Matched",
    created: "3 days ago",
    lat: 18.5590,
    lng: 73.8077,
    aiConfidence: 92,
  },
];

const StoreContext = createContext<Store | null>(null);

export function DemoStore({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    if (typeof window === "undefined") return seed;
    try {
      const saved = localStorage.getItem("samarth-demo-challenges");
      return saved ? JSON.parse(saved) : seed;
    } catch {
      return seed;
    }
  });
  const [notifications, setNotifications] = useState<string[]>([
    "3 partners matched your school-crossing challenge",
    "Your weekly impact pulse has increased",
    "Water access project moved to pilot stage",
  ]);

  useEffect(() => {
    localStorage.setItem("samarth-demo-challenges", JSON.stringify(challenges));
  }, [challenges]);

  const addChallenge = (input: Omit<Challenge, "id" | "voices" | "status" | "created" | "severity" | "aiConfidence">) => {
    const item: Challenge = {
      ...input,
      id: `user-${Date.now()}`,
      voices: 1,
      status: "Validating",
      severity: "Medium",
      created: "just now",
      aiConfidence: 85,
    };
    setChallenges((s) => [item, ...s]);
    setNotifications((s) => [`Your challenge "${item.title}" is being structured for review`, ...s]);
  };

  const addVoice = (id: string) =>
    setChallenges((s) => s.map((x) => (x.id === id ? { ...x, voices: x.voices + 1 } : x)));

  const markMatched = (id: string) => {
    setChallenges((s) => s.map((x) => (x.id === id ? { ...x, status: "Matched" } : x)));
    setNotifications((s) => ["Partner connection requested — we'll update you soon", ...s]);
  };

  return (
    <StoreContext.Provider
      value={{
        challenges,
        notifications,
        addChallenge,
        addVoice,
        markMatched,
        clearNotifications: () => setNotifications([]),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("DemoStore missing");
  return context;
}
