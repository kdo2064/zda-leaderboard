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

const rules = [
  {
    rule: "Rule 1: No hacking the scoreboard.",
    meme: "/memes/meme-1.jpg",
  },
  {
    rule: "Rule 2: Don't even think about it.",
    meme: "/memes/meme-2.jpg",
  },
  {
    rule: "Rule 3: Seriously, don't.",
    meme: "/memes/meme-3.jpg",
  },
  {
    rule: "Rule 4: We will find you.",
    meme: "/memes/meme-4.jpg",
  },
  {
    rule: "Rule 5: And it won't be pretty.",
    meme: "/memes/meme-5.jpg",
  },
  {
    rule: "Rule 6: We have a particular set of skills.",
    meme: "/memes/meme-6.jpg",
  },
  {
    rule: "Rule 7: Skills that make us a nightmare for people like you.",
    meme: "/memes/meme-7.jpg",
  },
  {
    rule: "Rule 8: If you let the scoreboard go now, that'll be the end of it.",
    meme: "/memes/meme-8.jpg",
  },
  {
    rule: "Rule 9: Okay, have fun!",
    meme: "/memes/meme-9.jpg",
  },
];

export default function ArenaPage() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-4">
            Arena Rules
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 text-center">
            Follow the rules, or face the consequences.
          </p>

          <Carousel className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            <CarouselContent>
              {rules.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border aspect-square">
                      <Image
                        src={item.meme}
                        alt={item.rule}
                        width={400}
                        height={400}
                        className="rounded-lg mb-4 object-contain h-64 w-full"
                        data-ai-hint="meme"
                      />
                      <p className="text-xl font-semibold text-center text-card-foreground">
                        {item.rule}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <div className="mt-8">
              <Link href="/" passHref>
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-3 text-base font-semibold">
                      Back to Home
                  </Button>
              </Link>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Zero Day Arena. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
