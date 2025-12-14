
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, TAGLINE } from '@/lib/constants';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

const animatedText = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function HeroSection() {
  if (!heroImage) return null;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden p-4 text-center text-primary-foreground">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-primary/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex w-full flex-col items-center"
      >
        <motion.h1
          variants={animatedText}
          initial="hidden"
          animate="visible"
          aria-label={TAGLINE}
          className="font-headline text-6xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl"
        >
          {TAGLINE.split('').map((char, index) => (
            <motion.span key={index} variants={letterAnimation} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mt-6 max-w-3xl text-lg text-slate-200 md:text-xl"
        >
          Discover handcrafted mattresses, beds, and sofas designed for your ultimate relaxation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" variant="primary-cta" asChild className="transform transition-transform duration-300 hover:scale-105">
            <Link href="/shop">
              Shop Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white/50 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Visit Store / WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
