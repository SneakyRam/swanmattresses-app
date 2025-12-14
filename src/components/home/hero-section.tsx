
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  WHATSAPP_LINK,
  TAGLINE_MAIN,
  TAGLINE_SUB,
} from '@/lib/constants';

const heroImage = PlaceHolderImages.find(
  (img) => img.id === 'hero-background'
);

export default function HeroSection() {
  if (!heroImage) return null;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        priority
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
      />

      {/* Theme-aware overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent dark:from-black/70 dark:via-black/40" />
      <div className="absolute inset-0 bg-brand-500/10 dark:bg-brand-400/10" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.25 } },
            }}
          >
            {/* Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="font-headline text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="animate-text-gradient bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 bg-[200%_auto] bg-clip-text text-transparent leading-[1.1] sm:leading-[1.05]">
                {TAGLINE_MAIN}
                <span className="block text-brand-200">
                  {TAGLINE_SUB}
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.15 },
                },
              }}
              className="mt-6 mx-auto max-w-xl text-lg text-slate-100 dark:text-slate-300 md:mx-0"
            >
              Discover handcrafted mattresses, beds, and sofas designed for
              unmatched comfort and lasting elegance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.3 },
                },
              }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              {/* Primary CTA */}
              <Button
                size="lg"
                variant="primary-cta"
                asChild
                className="group relative overflow-hidden w-full sm:w-auto"
              >
                <Link href="/shop">
                  <span className="relative z-10 flex items-center">
                    Shop Our Collection
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              {/* Secondary CTA */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/40 text-white backdrop-blur-md hover:bg-white/10 dark:border-white/20 w-full sm:w-auto"
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Store / WhatsApp
                  <MessageCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}
