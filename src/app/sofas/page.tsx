'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';
import SortDropdown from '@/components/shop/sort-dropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const heroImage = PlaceHolderImages.find((img) => img.id === 'category-sofa');

// Dummy data
const sofas = [
  { id: '9', name: 'Modern L-Shape Sofa', price: 79999, rating: 4.9, reviews: 150, imageId: 'product-3', href: '/product/modern-l-shape-sofa' },
  { id: '10', name: 'Classic 3-Seater Sofa', price: 65000, oldPrice: 72000, rating: 4.8, reviews: 200, imageId: 'product-4', href: '/product/classic-3-seater-sofa' },
  { id: '11', name: 'Cozy 2-Seater Loveseat', price: 48000, rating: 4.7, reviews: 120, imageId: 'product-1', href: '/product/cozy-2-seater-loveseat' },
  { id: '12', name: 'Convertible Sofa Bed', price: 55000, rating: 4.6, reviews: 90, imageId: 'product-2', href: '/product/convertible-sofa-bed' },
];

export default function SofasPage() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('popularity');

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const FilterSidebar = () => (
    <ProductFilters
        filters={{
          categories: ['L-Shaped', '2-Seater', '3-Seater', 'Sofa Bed'],
          priceRange: { min: 30000, max: 120000 },
          ratings: [5, 4, 3],
          materials: ['Fabric', 'Leatherette', 'Velvet'],
          sizes: [], // Using categories for sofa type
        }}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />
  );

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {heroImage && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          >
            <Image
              src={heroImage.imageUrl}
              alt="Comfortable living room with a modern sofa"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline text-4xl font-bold tracking-tight md:text-6xl"
          >
            Comfort Meets Modern Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-xl text-lg text-slate-200"
          >
            Find the perfect sofa to bring your living space together.
          </motion.p>
        </div>
      </section>

       {/* Main content */}
       <main className="container py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Our Sofas</h1>
          <div className="flex items-center gap-4">
             <SortDropdown value={sort} onValueChange={handleSortChange} />
             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="mt-8">
                        <FilterSidebar />
                    </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-4">
          <aside className="hidden md:block">
            <FilterSidebar />
          </aside>
          <div className="md:col-span-3">
            <ProductGrid products={sofas} />
          </div>
        </div>
      </main>
    </div>
  );
}