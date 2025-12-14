
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Instagram, Facebook, Loader2 } from 'lucide-react';
import { BRAND_NAME, CONTACT_PHONE, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, STORE_LOCATION, STORE_LOCATION_URL } from '@/lib/constants';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const contactInfo = [
  { icon: Phone, text: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}` },
  { icon: Mail, text: 'support@swanmattresses.com', href: 'mailto:support@swanmattresses.com' },
  { icon: MapPin, text: STORE_LOCATION, href: STORE_LOCATION_URL },
];

const socialLinks = [
    { icon: Instagram, text: '@swanmattresses', href: SOCIAL_INSTAGRAM },
    { icon: Facebook, text: 'Swan Mattresses', href: SOCIAL_FACEBOOK },
]

function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  // Dummy submission function
  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    console.log('Form submitted:', values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In a real app, you would handle the response from your Firebase function here.
    toast({
      title: 'Message Sent!',
      description: "We've received your message and will get back to you shortly.",
    });

    form.reset();
    setIsSubmitting(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm"
    >
      <h2 className="font-headline text-3xl font-bold">Send Us a Message</h2>
      <p className="mt-2 text-muted-foreground">We'll get back to you as soon as possible.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="How can we help you today?" {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full transition-transform duration-300 hover:scale-105" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-headline text-4xl font-bold md:text-6xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            We're here to help with any questions you may have. Reach out to us, and we'll respond as soon as we can.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
          {/* Contact Form */}
          <div className="md:col-span-3">
             {isClient && <ContactForm />}
          </div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:col-span-2"
          >
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <p className="mt-2 text-muted-foreground">Find us here or follow our journey online.</p>
            <div className="mt-8 space-y-6">
              {contactInfo.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-lg transition-colors hover:text-primary relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                  <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 space-y-4">
                 {socialLinks.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-lg transition-colors hover:text-primary relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-primary" />
                      <span>{item.text}</span>
                    </Link>
                  ))}
            </div>
             <div className="mt-12">
              <h3 className="font-headline text-2xl font-bold">Visit Our Store</h3>
              <p className="mt-2 text-muted-foreground">{STORE_LOCATION}</p>
              {/* Google Map */}
              <Link href={STORE_LOCATION_URL} target="_blank" rel="noopener noreferrer">
                <div className="mt-4 h-80 w-full overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-lg">
                   <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.802315752319!2d78.601931!3d17.485122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c148c155555%3A0x44d32f7903823032!2sSwan%20Mattresses%3A%20Manufacturers%20of%20Premium%20Mattresses%20%2C%20Sofas%20And%20Recliners!5e0!3m2!1sen!2sus!4v1722345678901!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0, pointerEvents: 'none' }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Swan Mattresses Store Location"
                    ></iframe>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
