"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ShieldIcon } from "@/components/icons";
import Link from 'next/link';

export function HeroSection() {
  const component = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    let ctx = gsap.context(() => {
      mm.add({
        isReduced: "(prefers-reduced-motion: reduce)",
        isNotReduced: "(prefers-reduced-motion: no-preference)",
      }, (context) => {
        const { isReduced } = context.conditions || {};

        if (isReduced) {
          gsap.set("[data-animate]", { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to("[data-animate='badge']", { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
          .to("[data-animate='title']", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to("[data-animate='subtitle']", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to("[data-animate='button']", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.4");
      });
    }, component);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={component} className="flex flex-col items-center justify-center text-center px-4 h-full">
      <div
        data-animate="badge"
        className="opacity-0 translate-y-5 mb-6 flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1 rounded-full text-sm font-semibold"
      >
        <ShieldIcon className="w-4 h-4 text-primary" />
        <span>Secure With Teachies</span>
      </div>
      <h1
        data-animate="title"
        className="opacity-0 translate-y-5 font-headline text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-4"
      >
        Phantom Flags 2.0
      </h1>
      <p
        data-animate="subtitle"
        className="opacity-0 translate-y-5 max-w-2xl text-lg md:text-xl text-muted-foreground mb-8"
      >
        Where elite hackers and security professionals compete. Sharpen your skills, exploit vulnerabilities, and capture the flag in the ultimate cybersecurity challenge.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/arena" passHref>
            <Button
              data-animate="button"
              size="lg"
              className="opacity-0 translate-y-5 rounded-full px-8 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
              aria-label="Join The Arena"
            >
              Join The Arena
            </Button>
        </Link>
        <Link href="/leaderboard" passHref>
            <Button
            data-animate="button"
            size="lg"
            variant="outline"
            className="opacity-0 translate-y-5 rounded-full px-8 py-3 text-base font-semibold border-accent text-accent hover:bg-accent/10 hover:text-accent transition-transform hover:scale-105"
            aria-label="View Leaderboard"
            >
            Leaderboard
            </Button>
        </Link>
      </div>
    </section>
  );
}
