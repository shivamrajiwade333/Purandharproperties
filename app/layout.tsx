import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Purandhar Properties | Premium Real Estate & Verified Homes',
  description: 'Find a place you love to call home with Purandhar Properties. Browse verified luxury homes, apartments, villas, plots, and commercial spaces across Pune and Purandhar region.',
  keywords: ['Purandhar Properties', 'real estate Pune', 'Purandhar real estate', 'plots for sale', 'apartments', 'villas', 'luxury homes', 'commercial space'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
