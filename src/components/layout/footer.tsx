import Link from 'next/link';
import { Facebook, Instagram, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { BRAND_NAME, CONTACT_PHONE, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, STORE_LOCATION } from '@/lib/constants';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { href: '/mattresses', label: 'Mattresses' },
      { href: '/beds', label: 'Beds' },
      { href: '/sofas', label: 'Sofas' },
      { href: '/shop', label: 'All Products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm">
              Crafting luxurious comfort for your perfect sleep, right from the heart of India.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline font-semibold uppercase tracking-wider">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="relative text-sm transition-colors hover:text-primary after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-2 transition-colors hover:text-primary">
                <Phone className="w-4 h-4" />
                <span>{CONTACT_PHONE}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{STORE_LOCATION}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6 transition-transform hover:text-primary hover:scale-110" />
              </a>
              <a href={SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6 transition-transform hover:text-primary hover:scale-110" />
              </a>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-8">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
