import Image from 'next/image';
import { Award, Feather, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: Award,
    title: 'Unmatched Quality',
    description: 'We use only the finest materials, ensuring durability and a premium feel that lasts for years.',
    imageId: 'why-swan-quality',
  },
  {
    icon: Feather,
    title: 'Supreme Comfort',
    description: 'Our mattresses are ergonomically designed to provide optimal support and pressure relief for a restorative sleep.',
    imageId: 'why-swan-comfort',
  },
  {
    icon: ShieldCheck,
    title: 'Customer Trust',
    description: 'With a comprehensive warranty and dedicated support, your satisfaction is our top priority.',
    imageId: 'why-swan-trust',
  },
];

export default function WhySwan() {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Swan?
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Experience the difference that true craftsmanship and dedication to comfort can make.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const image = PlaceHolderImages.find((img) => img.id === feature.imageId);
            if (!image) return null;

            return (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-background">
                     <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                        data-ai-hint={image.imageHint}
                      />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
