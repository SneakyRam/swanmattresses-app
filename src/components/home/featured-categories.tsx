import Image from 'next/image';
import Link from 'next/link';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Mattresses',
    href: '/mattresses',
    imageId: 'category-mattress',
    description: 'Engineered for perfect sleep.',
  },
  {
    title: 'Beds',
    href: '/beds',
    imageId: 'category-bed',
    description: 'Frames that define your space.',
  },
  {
    title: 'Sofas',
    href: '/sofas',
    imageId: 'category-sofa',
    description: 'Comfort that brings you together.',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Our Collection
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Find the perfect centerpiece for your home, from the bedroom to the living room.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category) => {
            const image = PlaceHolderImages.find((img) => img.id === category.imageId);
            if (!image) return null;

            return (
              <Link key={category.title} href={category.href} className="group block">
                <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative h-96 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="font-headline text-2xl font-semibold">{category.title}</h3>
                      <p className="mt-1 text-sm text-slate-200">{category.description}</p>
                      <div className="mt-4 flex items-center text-sm font-medium">
                        Shop Now <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
