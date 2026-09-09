"use client";
import { ReactNode, useCallback, useState } from "react";
import { JharkhandCinematicIntro } from "./jharkhand-cinematic-intro";
export function LandingExperience({children}:{children:ReactNode}){const [ready,setReady]=useState(false);const complete=useCallback(()=>setReady(true),[]);return <>{!ready&&<JharkhandCinematicIntro onFinish={complete}/>}<div className={ready?"landing-revealed":"landing-hidden"}>{children}</div></>}
