"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Crown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

gsap.registerPlugin(Flip);

const initialTeams = [
  { name: "Cyber-Punishers", rank: 1, points: 9850, change: 0 },
  { name: "Digital-Dragons", rank: 2, points: 9700, change: 0 },
  { name: "Fatal-Bytes", rank: 3, points: 9600, change: 0 },
  { name: "Ghost-Protocol", rank: 4, points: 9450, change: 0 },
  { name: "Shadow-Hackers", rank: 5, points: 9300, change: 0 },
  { name: "Team-Solaris", rank: 6, points: 9150, change: 0 },
  { name: "Cyber-Ninjas", rank: 7, points: 9000, change: 0 },
  { name: "Void-Strikers", rank: 8, points: 8850, change: 0 },
  { name: "Binary-Bandits", rank: 9, points: 8700, change: 0 },
  { name: "Code-Crusaders", rank: 10, points: 8550, change: 0 },
];

export function Leaderboard() {
  const [teams, setTeams] = useState(initialTeams);
  const component = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [sortedTeams, setSortedTeams] = useState([...initialTeams]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTeams = teams.map((team) => ({
        ...team,
        points: team.points + Math.floor(Math.random() * 151) - 50,
      }));

      const sorted = [...newTeams].sort((a, b) => b.points - a.points);
      const ranked = sorted.map((team, index) => ({
        ...team,
        change: team.rank - (index + 1),
        rank: index + 1,
      }));

      setTeams(ranked);
    }, 2000);

    return () => clearInterval(interval);
  }, [teams]);

  useLayoutEffect(() => {
    if (!list.current) return;
    const teamElements = list.current.children;

    let ctx = gsap.context(() => {
      const state = Flip.getState(Array.from(teamElements));

      const hasChanged = JSON.stringify(teams) !== JSON.stringify(sortedTeams);
      if(hasChanged) {
        setSortedTeams(teams);

        Flip.from(state, {
          duration: 0.7,
          ease: "power3.inOut",
          absolute: true,
          onEnter: (elements) =>
            gsap.from(elements, { opacity: 0, scale: 0.8, duration: 0.3, delay: 0.1 }),
          onLeave: (elements) =>
            gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.3 }),
        });
      }
    }, component);

    return () => ctx.revert();
  }, [teams, sortedTeams]);

  const [top3, otherTeams] = sortedTeams.reduce<[typeof teams, typeof teams]>(
    (acc, team) => {
      acc[team.rank <= 3 ? 0 : 1].push(team);
      return acc;
    },
    [[], []]
  );

  return (
    <div ref={component} className="flex flex-col h-full w-full bg-background text-foreground font-body p-4 md:p-6 overflow-hidden">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 text-center sm:text-left">
        <div>
            <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary">
                Leaderboard
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Top 10 Teams - Zero Day Arena</p>
        </div>
        <Link href="/" passHref>
            <Button variant="outline" className="mt-4 sm:mt-0">
                Back to Home
            </Button>
        </Link>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {top3.map((team, index) => (
            <div
              key={team.name}
              data-flip-id={team.name}
              className={cn(
                "p-4 rounded-lg border flex flex-col items-center justify-center transition-all duration-300",
                team.rank === 1 && "border-primary/50 bg-primary/10 shadow-[0_0_20px_theme(colors.primary/0.3)] md:scale-105",
                team.rank === 2 && "border-accent/50 bg-accent/10 md:mt-4",
                team.rank === 3 && "border-accent/50 bg-accent/10 md:mt-4"
              )}
            >
              {team.rank === 1 && <Crown className="w-8 h-8 text-primary mb-2" />}
              <div className="text-2xl font-bold font-headline text-primary">{`#${team.rank}`}</div>
              <div className="text-lg font-semibold mt-1 truncate">{team.name}</div>
              <div className="text-xl font-bold text-foreground mt-1">{team.points.toLocaleString()} PTS</div>
            </div>
          ))}
        </div>

        {/* Other Teams List */}
        <div className="flex-grow bg-card/50 rounded-lg border border-border/50 overflow-y-auto">
            <ul ref={list} className="p-2 space-y-2">
            {otherTeams.map((team) => (
                <li
                key={team.name}
                data-flip-id={team.name}
                className="flex items-center p-3 bg-background/50 rounded-md border border-transparent hover:border-accent/50 transition-colors duration-200"
                >
                <div className="w-10 text-center text-lg font-bold font-headline text-muted-foreground">{team.rank}</div>
                <div className="flex-grow font-semibold ml-4 truncate">{team.name}</div>
                <div className="w-24 text-right font-bold text-primary">{team.points.toLocaleString()} PTS</div>
                <div className="w-12 text-right flex justify-end">
                    {team.change < 0 && <ArrowUp className="w-5 h-5 text-green-500" />}
                    {team.change > 0 && <ArrowDown className="w-5 h-5 text-red-500" />}
                </div>
                </li>
            ))}
            </ul>
        </div>
      </main>
    </div>
  );
}
