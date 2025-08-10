"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const rules = [
  {
    rule: "Rule 1: No hacking the scoreboard.",
    meme: "/meme/meme-1.jpg",
  },
  {
    rule: "Rule 2: Don't even think about it.",
    meme: "/meme/meme-2.jpg",
  },
  {
    rule: "Rule 3: Seriously, don't.",
    meme: "/meme/meme-3.jpg",
  },
  {
    rule: "Rule 4: We will find you.",
    meme: "/meme/meme-4.jpg",
  },
  {
    rule: "Rule 5: And it won't be pretty.",
    meme: "/meme/meme-5.jpg",
  },
  {
    rule: "Rule 6: We have a particular set of skills.",
    meme: "/meme/meme-6.jpg",
  },
  {
    rule: "Rule 7: Skills that make us a nightmare for people like you.",
    meme: "/meme/meme-7.jpg",
  },
  {
    rule: "Rule 8: If you let the scoreboard go now, that'll be the end of it.",
    meme: "/meme/meme-8.jpg",
  },
  {
    rule: "Rule 9: Okay, have fun!",
    meme: "/meme/meme-9.jpg",
  },
];

export default function ArenaPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  const isLastSlide = current === rules.length - 1;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-2">
                Arena Rules
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-muted-foreground mb-4 text-center">
                Follow the rules, or face the consequences.
            </p>

            <Carousel setApi={setApi} className="w-full max-w-[300px] sm:max-w-[350px]">
                <CarouselContent>
                {rules.map((item, index) => (
                    <CarouselItem key={index}>
                    <div className="p-1">
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border aspect-square">
                        <div className="flex-1 w-full relative">
                            <Image
                                src={item.meme}
                                alt={`Rule ${index + 1}`}
                                fill
                                className="rounded-lg object-contain"
                                data-ai-hint="meme"
                            />
                        </div>
                        </div>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
            <div className="mt-6">
                <Link href={isLastSlide ? "/battle-zone" : "/"} passHref>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-3 text-base font-semibold">
                        {isLastSlide ? "Go to Battle Zone" : "Back to Home"}
                    </Button>
                </Link>
            </div>
        </div>
      </main>
      <footer className="text-center py-4 text-muted-foreground text-xs shrink-0">
        <p>&copy; {new Date().getFullYear()} Zero Day Arena. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
