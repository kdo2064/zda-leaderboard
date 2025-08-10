import { HeroSection } from '@/components/hero-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content" className="flex-grow flex items-center justify-center">
        <HeroSection />
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Zero Day Arena. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
