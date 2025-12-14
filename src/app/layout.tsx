import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';
import JsonLdSchema from '@/components/shared/json-ld-schema';
import { BRAND_NAME, WEBSITE_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} - Luxury Mattresses, Beds, and Sofas`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: 'Experience unparalleled comfort and luxury with Swan Mattresses. Discover our premium collection of mattresses, beds, and sofas, crafted for the perfect sleep.',
  metadataBase: new URL(WEBSITE_URL),
  openGraph: {
    title: `${BRAND_NAME} - Luxury Mattresses, Beds, and Sofas`,
    description: 'Experience unparalleled comfort and luxury with Swan Mattresses. Discover our premium collection of mattresses, beds, and sofas, crafted for the perfect sleep.',
    url: WEBSITE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: '/og-image.jpg', // To be replaced with an actual image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} - Luxury Mattresses, Beds, and Sofas`,
    description: 'Experience unparalleled comfort and luxury with Swan Mattresses. Discover our premium collection of mattresses, beds, and sofas, crafted for the perfect sleep.',
    // site: '@YourTwitterHandle', // To be replaced
    // creator: '@YourTwitterHandle', // To be replaced
    images: ['/twitter-image.jpg'], // To be replaced with an actual image
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0E6FF' },
    { media: '(prefers-color-scheme: dark)', color: '#1A102C' },
  ],
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
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
