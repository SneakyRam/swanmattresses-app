'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Users, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BRAND_NAME, STORE_LOCATION } from '@/lib/constants';

const aboutImage = PlaceHolderImages.find((img) => img.id === 'why-swan-quality');

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] min-h-[300px] bg-cover bg-center"
      >
        {aboutImage && (
          <Image
            src={aboutImage.imageUrl}
            alt="Craftsmanship"
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline text-4xl font-bold tracking-tight md:text-6xl"
          >
            Our Story of Comfort
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 max-w-2xl text-lg text-slate-200"
          >
            Crafting premium sleep experiences from the heart of India.
          </motion.p>
        </div>
      </motion.section>

      {/* Company Overview */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="container py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Welcome to {BRAND_NAME}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Founded on the principle that luxury and comfort should be accessible to all, {BRAND_NAME} began its journey in a small workshop in Rampally, Telangana. Our passion for quality craftsmanship and innovative design drives us to create furniture that doesn’t just fill a room, but transforms it into a sanctuary of relaxation.
          </p>
        </div>
      </motion.section>

      {/* Mission & Values */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-3">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-center"
          >
            <Award className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To deliver unparalleled comfort and quality, enhancing the well-being of our customers through meticulously crafted sleep and seating solutions.
            </p>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.4 }}
            className="text-center"
          >
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Values</h3>
            <p className="mt-2 text-muted-foreground">
              Integrity, innovation, and customer-centricity are at the core of everything we do. We believe in building lasting relationships based on trust.
            </p>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.6 }}
            className="text-center"
          >
            <MapPin className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Roots</h3>
            <p className="mt-2 text-muted-foreground">
              Proudly based in {STORE_LOCATION}. We combine local craftsmanship with global standards to bring you the best in home comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Swan */}
      <section className="container py-16 md:py-24">
          <WhySwan />
      </section>
    </div>
  );
}

// Re-using the WhySwan component for consistency
const WhySwan = () => {
    const features = [
      {
        title: 'Unmatched Quality',
        description: 'We use only the finest materials, ensuring durability and a premium feel that lasts for years.',
      },
      {
        title: 'Supreme Comfort',
        description: 'Our mattresses are ergonomically designed to provide optimal support and pressure relief.',
      },
      {
        title: 'Customer Trust',
        description: 'With a comprehensive warranty and dedicated support, your satisfaction is our top priority.',
      },
    ];

    return (
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Why {BRAND_NAME}?</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={fadeIn}
                      transition={{ ...fadeIn.transition, delay: i * 0.2 }}
                    >
                        <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};