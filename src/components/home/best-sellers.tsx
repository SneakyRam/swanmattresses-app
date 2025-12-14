import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const bestSellers = [
  { id: '1', name: 'CloudComfort Premium', price: 25999, oldPrice: 32999, rating: 4.8, reviews: 120, imageId: 'product-1', href: '/product/cloudcomfort-premium' },
  { id: '2', name: 'OrthoDream Support', price: 18999, rating: 4.9, reviews: 250, imageId: 'product-2', href: '/product/orthodream-support' },
  { id: '3', name: 'LuxeSleep Gel Memory', price: 29999, oldPrice: 38999, rating: 4.7, reviews: 98, imageId: 'product-3', href: '/product/luxesleep-gel-memory' },
  { id: '4', name: 'EcoRest Organic Latex', price: 34999, rating: 4.9, reviews: 75, imageId: 'product-4', href: '/product/ecorest-organic-latex' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
};

export default function BestSellers() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Best Sellers
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Loved by our customers. Discover the products everyone is talking about.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {bestSellers.map((product) => {
            const image = PlaceHolderImages.find((img) => img.id === product.imageId);
            if (!image) return null;

            return (
              <Link key={product.id} href={product.href} className="group">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="p-0 flex-grow flex flex-col">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={image.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                      {product.oldPrice && (
                        <Badge variant="destructive" className="absolute top-2 left-2">SALE</Badge>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviews} reviews)</span>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button className="w-full" variant="outline">Add to Cart</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
