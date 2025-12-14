'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

const headlineText = "Where Luxury Meets Comfort.";
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
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden text-center text-primary-foreground">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-primary/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center p-4"
      >
        <motion.h1
          variants={animatedText}
          initial="hidden"
          animate="visible"
          aria-label={headlineText}
          className="font-headline text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {headlineText.split('').map((char, index) => (
            <motion.span key={index} variants={letterAnimation} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mt-4 max-w-xl text-lg text-slate-200 md:text-xl"
        >
          Discover handcrafted mattresses, beds, and sofas designed for your ultimate relaxation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/shop">
              Shop Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Visit Store / WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
