import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Purandhar Properties | Premium Real Estate & Verified Homes',
  description: 'Find a place you love to call home with Purandhar Properties. Browse verified luxury homes, apartments, villas, plots, and commercial spaces across Pune and Purandhar region.',
  keywords: ['Purandhar Properties', 'real estate Pune', 'Purandhar real estate', 'plots for sale', 'apartments', 'villas', 'luxury homes', 'commercial space'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="overflow-x-hidden w-full max-w-[100vw]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
