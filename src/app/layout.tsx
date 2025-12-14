import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';
import JsonLdSchema from '@/components/shared/json-ld-schema';
import { BRAND_NAME, TAGLINE_MAIN, TAGLINE_SUB, WEBSITE_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });

const siteTitle = `${BRAND_NAME} | ${TAGLINE_MAIN}`;
const siteDescription = `Experience unparalleled comfort with ${BRAND_NAME}. ${TAGLINE_MAIN} ${TAGLINE_SUB}. Discover our premium collection of mattresses, beds, and sofas, crafted for the perfect sleep in India.`;

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    default: siteTitle,
    template: `%s | ${BRAND_NAME}`,
  },
  description: siteDescription,
  keywords: ["mattress", "sofa", "bed", "furniture", "hyderabad", "india", "swan mattresses"],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: WEBSITE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteDescription,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${WEBSITE_URL}/twitter-image.png`],
    creator: '@swanmattresses'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: WEBSITE_URL,
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FBFD' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdSchema />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ChatWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
