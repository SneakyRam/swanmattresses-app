'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  imageId: string;
  href: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const image = PlaceHolderImages.find((img) => img.id === product.imageId) || PlaceHolderImages[4];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
    // Add to cart logic here
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Link href={product.href} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardContent className="flex flex-grow flex-col p-0">
            <div className="relative aspect-square w-full">
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {product.oldPrice && (
                <Badge variant="destructive" className="absolute top-2 left-2">SALE</Badge>
              )}
               <div className="absolute bottom-2 right-2 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="sm" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Quick Add
                </Button>
            </div>
            </div>
            <div className="flex flex-grow flex-col p-4">
              <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                {product.oldPrice && (
                  <p className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                )}
              </div>
              <div className="mt-auto flex items-center gap-1 pt-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span className='hidden sm:inline'>({product.reviews} reviews)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}