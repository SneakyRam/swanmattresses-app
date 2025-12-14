'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { allProducts } from '@/lib/products';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

const cartItems = [
  {
    product: allProducts.find(p => p.id === '1'),
    quantity: 1,
  },
  {
    product: allProducts.find(p => p.id === '9'),
    quantity: 1,
  },
].filter(item => item.product); // Filter out any unfound products

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  const shipping = 2500; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-secondary">
      <div className="container py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Shopping Cart</span>
        </div>

        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="divide-y p-0">
                  {cartItems.map(({ product, quantity }) => {
                    if (!product) return null;
                    const image = PlaceHolderImages.find(img => img.id === product.imageId);
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                        className="flex items-center gap-4 p-4 md:p-6"
                      >
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <Link href={product.href} className="font-semibold text-foreground hover:text-primary">{product.name}</Link>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="mt-2 text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <div className="flex items-center gap-2 rounded-md border p-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6" disabled><Minus className="h-3 w-3" /></Button>
                              <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6" disabled><Plus className="h-3 w-3" /></Button>
                           </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" disabled>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">{formatPrice(shipping)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button size="lg" className="w-full" disabled>Proceed to Checkout</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
