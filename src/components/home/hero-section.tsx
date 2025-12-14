'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, TAGLINE } from '@/lib/constants';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

export default function HeroSection() {
  if (!heroImage) return null;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-start overflow-hidden p-4 text-center text-primary-foreground md:p-16">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-0 bg-primary/10" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="relative z-10 flex flex-col items-start text-left"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="font-headline text-6xl font-bold tracking-tight text-transparent sm:text-8xl"
        >
          <span className="animate-text-gradient bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-[200%_auto] bg-clip-text text-transparent">
            {TAGLINE}
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
            },
          }}
          className="mt-6 max-w-xl text-lg text-slate-200 md:text-xl"
        >
          Discover handcrafted mattresses, beds, and sofas designed for your
          ultimate relaxation.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' },
            },
          }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            variant="primary-cta"
            asChild
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <Link href="/shop">
              Shop Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/50 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Visit Store / WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
