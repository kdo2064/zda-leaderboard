"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

gsap.registerPlugin(Flip);

const initialTeams = [
  { name: "Cyber-Punishers", rank: 1, points: 9850 },
  { name: "Digital-Dragons", rank: 2, points: 9700 },
  { name: "Fatal-Bytes", rank: 3, points: 9600 },
  { name: "Ghost-Protocol", rank: 4, points: 9450 },
  { name: "Shadow-Hackers", rank: 5, points: 9300 },
  { name: "Team-Solaris", rank: 6, points: 9150 },
  { name: "Cyber-Ninjas", rank: 7, points: 9000 },
  { name: "Void-Strikers", rank: 8, points: 8850 },
  { name: "Binary-Bandits", rank: 9, points: 8700 },
  { name: "Code-Crusaders", rank: 10, points: 8550 },
];

export function Leaderboard() {
  const [teams, setTeams] = useState(initialTeams);
  const component = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTeams = teams.map((team) => ({
        ...team,
        points: team.points + Math.floor(Math.random() * 251) - 50,
      }));
      setTeams(newTeams);
    }, 2000);

    return () => clearInterval(interval);
  }, [teams]);

  useLayoutEffect(() => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    const rankedTeams = sortedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
    }));

    if (JSON.stringify(teams) !== JSON.stringify(rankedTeams)) {
      const teamElements = list.current?.children;
      if (!teamElements) return;

      const state = Flip.getState(Array.from(teamElements));
      
      setTeams(rankedTeams);

      Flip.from(state, {
        duration: 0.7,
        ease: "power2.inOut",
        stagger: 0.05,
        absolute: true,
      });
    }
  }, [teams]);


  return (
    <div ref={component} className="flex flex-col h-full w-full bg-background text-foreground font-body p-4 md:p-6 lg:p-8 overflow-hidden">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 text-center sm:text-left">
        <div>
            <h1 className="font-headline text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary">
                Leaderboard
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Top 10 Teams - Zero Day Arena</p>
        </div>
        <Link href="/" passHref>
            <Button variant="outline" className="mt-4 sm:mt-0 rounded-full px-6">
                Back to Home
            </Button>
        </Link>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow bg-card/50 rounded-lg border border-border/50 overflow-y-auto">
            <ul ref={list} className="p-1.5 space-y-1.5">
            {teams.map((team) => (
                <li
                    key={team.name}
                    className={cn(
                        "flex items-center p-3 rounded-md border transition-colors duration-300",
                        team.rank === 1 && "border-primary/50 bg-primary/20 shadow-[0_0_20px_theme(colors.primary/0.3)]",
                        team.rank > 1 && team.rank <= 3 && "border-accent/50 bg-accent/10",
                        team.rank > 3 && "bg-background/50 border-transparent hover:border-accent/50"
                    )}
                >
                    <div className="flex items-center flex-grow">
                        <div className={cn("w-10 text-center text-base font-bold font-headline", {
                            "text-primary": team.rank === 1,
                            "text-accent": team.rank > 1 && team.rank <= 3,
                            "text-muted-foreground": team.rank > 3
                        })}>
                            {team.rank === 1 ? <Crown className="w-6 h-6 mx-auto text-primary"/> : `#${team.rank}`}
                        </div>
                        <div className="font-semibold ml-4 truncate text-base">{team.name}</div>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="font-bold text-primary text-base tracking-wider">{team.points.toLocaleString()} PTS</div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
      </main>
    </div>
  );
}
