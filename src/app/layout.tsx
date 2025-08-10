import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Phantom Flags 2.0',
  description: 'Join the ultimate cybersecurity challenge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute z-50 m-4 px-4 py-3 bg-card text-card-foreground rounded-lg">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
