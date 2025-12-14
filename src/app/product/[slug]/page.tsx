import {
  ChevronRight,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import BestSellers from '@/components/home/best-sellers';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const product = {
  id: '1',
  name: 'CloudComfort Premium',
  price: 25999,
  oldPrice: 32999,
  rating: 4.8,
  reviews: 120,
  imageId: 'product-1',
  description:
    'Experience the ultimate in comfort with the CloudComfort Premium mattress. Featuring our latest sleep technology, this mattress provides a cloud-like feel with the support your body needs. Wake up refreshed and ready to take on the day.',
  features: [
    'Advanced multi-layer foam construction',
    'Cooling gel-infused top layer',
    'Hypoallergenic materials',
    '10-year warranty',
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <div className="bg-background">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                {product.oldPrice && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    SALE
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <BestSellers />
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
