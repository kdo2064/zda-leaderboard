import { HeroSection } from '@/components/hero-section';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <main id="main-content" className="flex-grow">
        <HeroSection />
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Zero Day Arena. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
