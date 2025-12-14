import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SOCIAL_INSTAGRAM } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const instagramImages = [
  'instagram-1',
  'instagram-2',
  'instagram-3',
  'instagram-4',
  'instagram-5',
  'instagram-6',
];

export default function InstagramSection() {
  const images = instagramImages
    .map((id) => PlaceHolderImages.find((img) => img.id === id))
    .filter(Boolean);

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Follow Our Journey
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Get inspired by our latest designs and customer homes on Instagram.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {images.map((image, index) => (
            image && (
            <Link key={index} href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
            </Link>
            )
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild variant="outline">
            <Link href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              @swanmattresses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
