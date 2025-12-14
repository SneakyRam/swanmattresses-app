
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';
import SortDropdown from '@/components/shop/sort-dropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { allProducts } from '@/lib/products';

const heroImage = PlaceHolderImages.find((img) => img.id === 'category-sofa');
const sofas = allProducts.filter(p => p.category === 'Sofas');

export default function SofasPage() {
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState('popularity');

  const filteredSofas = useMemo(() => {
    return sofas.filter(sofa => {
      // Category filter
      if (filters.category?.length > 0 && !filters.category.includes(sofa.size)) {
        return false;
      }
      // Price filter
      if (filters.price) {
        if (sofa.price < filters.price[0] || sofa.price > filters.price[1]) {
          return false;
        }
      }
      // Rating filter
      if (filters.ratings?.length > 0 && !filters.ratings.some((r: number) => sofa.rating >= r)) {
        return false;
      }
      // Material filter
      if (filters.material?.length > 0 && !filters.material.includes(sofa.material)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const FilterSidebar = () => (
    <ProductFilters
        filters={{
          categories: ['L-Shape', '2-Seater', '3-Seater', 'Sofa Bed'],
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
             {filteredSofas.length > 0 ? (
                <ProductGrid products={filteredSofas} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <h3 className="font-bold text-xl">No Products Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
