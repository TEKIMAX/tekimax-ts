import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TEKIMAX Documentation | Universal AI Standard',
  description: 'Official documentation for TEKIMAX TS, CLI, and Protocol. Build sovereign, co-adaptive AI systems with local-first tooling.',
  openGraph: {
    title: 'TEKIMAX Documentation | Universal AI Standard',
    description: 'Official documentation for TEKIMAX TS, CLI, and Protocol. Build sovereign, co-adaptive AI systems with local-first tooling.',
    url: 'https://docs.tekimax.com',
    siteName: 'TEKIMAX Documentation',
    images: [
      {
        url: 'https://tekimax.com/images/tekimax-social-card.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEKIMAX Documentation | Universal AI Standard',
    description: 'Official documentation for TEKIMAX TS, CLI, and Protocol.',
    images: ['https://tekimax.com/images/tekimax-social-card.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: false
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
