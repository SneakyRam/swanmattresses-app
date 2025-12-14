'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, MessageSquare, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { CONTACT_PHONE, WHATSAPP_LINK } from '@/lib/constants';

const inquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

interface PurchaseInquiryDialogProps {
  productName: string;
}

export function PurchaseInquiryDialog({ productName }: PurchaseInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in purchasing the ${productName}. Please provide me with more information.`,
    },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);
    console.log('Purchase Inquiry Submitted:', values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you'd call a Firebase function here.
    toast({
      title: 'Inquiry Sent!',
      description: "We've received your inquiry and will contact you shortly.",
    });

    setIsSubmitting(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Purchase Inquiry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Purchase Inquiry: {productName}</DialogTitle>
          <DialogDescription>
            To purchase this item, please fill out the form below or contact us directly. Our sales team will get in touch with you shortly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Phone Number" {...field} />
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </Button>
          </form>
        </Form>
        
        <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
        </div>

        <div className="space-y-3">
             <p className="text-center text-sm text-muted-foreground">Connect with us directly</p>
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp
                    </a>
                </Button>
                <Button variant="outline" asChild>
                    <a href={`tel:${CONTACT_PHONE}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Us
                    </a>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
