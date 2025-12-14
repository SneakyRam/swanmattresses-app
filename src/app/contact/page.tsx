'use client';

import { useState } from 'react';
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
import { BRAND_NAME, CONTACT_PHONE, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, STORE_LOCATION } from '@/lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const contactInfo = [
  { icon: Phone, text: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}` },
  { icon: Mail, text: 'support@swanmattresses.com', href: 'mailto:support@swanmattresses.com' },
  { icon: MapPin, text: STORE_LOCATION, href: '#' },
  { icon: Instagram, text: '@swanmattresses', href: SOCIAL_INSTAGRAM },
  { icon: Facebook, text: 'Swan Mattresses', href: SOCIAL_FACEBOOK },
];

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
    >
      <h2 className="font-headline text-3xl font-bold">Send Us a Message</h2>
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
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
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
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Contact Form */}
          {isClient && <ContactForm />}


          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <div className="mt-8 space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-lg transition-colors hover:text-primary"
                >
                  <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
             <div className="mt-12">
              <h3 className="font-headline text-2xl font-bold">Visit Our Store</h3>
              <p className="mt-2 text-muted-foreground">{STORE_LOCATION}</p>
              {/* Dummy Map */}
              <div className="mt-4 h-64 w-full rounded-lg bg-secondary flex items-center justify-center">
                 <p className="text-muted-foreground">Map will be displayed here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
