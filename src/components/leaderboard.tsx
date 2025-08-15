"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { generateLeaderboardCommentary } from "@/ai/flows/leaderboard-commentary-flow";
import { Bot } from "lucide-react";
import type { LeaderboardCommentaryInput } from "@/ai/schemas/leaderboard-commentary";

gsap.registerPlugin(Flip);

type Team = LeaderboardCommentaryInput['teams'][number];

const LEADERBOARD_API_URL = "https://pfswt.zerodayarena.com/api/leaderboard";


export function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [commentary, setCommentary] = useState("AI commentator is warming up...");
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(true);
  const component = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const updateCommentary = useCallback(async (currentTeams: Team[]) => {
    if (currentTeams.length === 0) return;
    setIsCommentaryLoading(true);
    try {
      const result = await generateLeaderboardCommentary({ teams: currentTeams });
      setCommentary(result.commentary);
    } catch (error) {
      console.error("Error generating commentary:", error);
      setCommentary("The commentator is currently offline.");
    } finally {
      setIsCommentaryLoading(false);
    }
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(LEADERBOARD_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Team[] = await response.json();
      const sortedTeams = [...data].sort((a, b) => b.points - a.points);
      const rankedTeams = sortedTeams.map((t, i) => ({ ...t, rank: i + 1 }));
      setTeams(rankedTeams);
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (teams.length > 0) {
      updateCommentary(teams);
    }
  }, [teams, updateCommentary]);

  useLayoutEffect(() => {
    if (!list.current) return;
    const ctx = gsap.context(() => {
        const teamElements = Array.from(list.current!.children);
        const state = Flip.getState(teamElements);

        Flip.from(state, {
            duration: 0.7,
            ease: "power2.inOut",
            stagger: 0.05,
            absolute: true,
        });
    }, component);
    return () => ctx.revert();
}, [teams]);


  return (
    <div ref={component} className="flex flex-col h-full w-full bg-background text-foreground font-body p-4 md:p-6 lg:p-8 overflow-hidden">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 text-center sm:text-left shrink-0 max-w-4xl w-full mx-auto">
        <div>
            <h1 className="font-headline text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary">
                Leaderboard
            </h1>
            <p className="text-muted-foreground mt-1 text-xs md:text-sm">Top 10 Teams - Zero Day Arena</p>
        </div>
        <Link href="/" passHref>
            <Button variant="outline" className="mt-4 sm:mt-0 rounded-full px-6">
                Back to Home
            </Button>
        </Link>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden max-w-4xl w-full mx-auto">
        <div className="flex-grow bg-card/50 rounded-lg border border-border/50 overflow-y-auto">
            <ul ref={list} className="p-1 space-y-1">
            {teams.length === 0 && (
              <li className="flex items-center justify-center p-4 text-muted-foreground">
                Loading leaderboard...
              </li>
            )}
            {teams.map((team) => (
                <li
                    key={team.name}
                    data-rank={team.rank}
                    className={cn(
                        "flex items-center p-2 rounded-md border transition-colors duration-300",
                        team.rank === 1 && "border-primary/50 bg-primary/20 shadow-[0_0_20px_theme(colors.primary/0.3)]",
                        team.rank > 1 && team.rank <= 3 && "border-accent/50 bg-accent/10",
                        team.rank > 3 && "bg-background/50 border-transparent hover:border-accent/50"
                    )}
                >
                    <div className="flex items-center flex-grow">
                        <div className={cn("w-10 text-center text-sm font-bold font-headline", {
                            "text-primary": team.rank === 1,
                            "text-accent": team.rank > 1 && team.rank <= 3,
                            "text-muted-foreground": team.rank > 3
                        })}>
                            {team.rank === 1 ? <Crown className="w-5 h-5 mx-auto text-primary"/> : `#${team.rank}`}
                        </div>
                        <div className="font-semibold ml-3 truncate text-sm">{team.name}</div>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="font-bold text-primary text-sm tracking-wider">{team.points.toLocaleString()} PTS</div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        <div className="shrink-0 mt-4 p-4 rounded-lg bg-card/50 border border-border/50 flex items-start gap-3">
          <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-grow">
            <h2 className="font-headline text-base font-bold text-primary">AI Commentary</h2>
            {isCommentaryLoading ? (
              <div className="space-y-2 mt-1">
                <div className="h-4 bg-muted/50 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted/50 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">{commentary}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
