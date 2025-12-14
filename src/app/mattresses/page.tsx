
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';
import SortDropdown from '@/components/shop/sort-dropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { allProducts } from '@/lib/products';

const heroImage = PlaceHolderImages.find((img) => img.id === 'category-mattress');
const mattresses = allProducts.filter(p => p.category === 'Mattresses');


export default function MattressesPage() {
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState('popularity');

  const filteredMattresses = useMemo(() => {
    return mattresses.filter(mattress => {
      // Category filter
      if (filters.category?.length > 0 && !filters.category.includes(mattress.material)) {
        return false;
      }
      // Price filter
      if (filters.price) {
        if (mattress.price < filters.price[0] || mattress.price > filters.price[1]) {
          return false;
        }
      }
      // Rating filter
      if (filters.ratings?.length > 0 && !filters.ratings.some((r: number) => mattress.rating >= r)) {
        return false;
      }
      // Size filter
      if (filters.size?.length > 0 && !filters.size.includes(mattress.size)) {
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
    // Here you would typically refetch data with new sorting
  };
  
  const FilterSidebar = () => (
    <ProductFilters
      filters={{
        categories: ['Foam', 'Spring', 'Hybrid', 'Latex'],
        priceRange: { min: 10000, max: 50000 },
        ratings: [5, 4, 3],
        materials: [], // Not applicable for mattresses
        sizes: ['Single', 'Double', 'Queen', 'King'],
      }}
      currentFilters={filters}
      onFilterChange={handleFilterChange}
    />
  );


  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex h-[70vh] min-h-[500px] items-center justify-start overflow-hidden text-primary-foreground">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          className="relative z-10 p-8 text-left md:p-16"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Engineered for Perfect Sleep
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
            }}
            className="mt-6 max-w-lg text-lg text-slate-200"
          >
            Experience unparalleled comfort and support for a truly restorative night's rest.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' } },
            }}
            className="mt-10"
          >
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="#products">Shop Mattresses</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main id="products" className="container scroll-mt-20 py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Our Mattresses</h1>
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
             {filteredMattresses.length > 0 ? (
                <ProductGrid products={filteredMattresses} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <h3 className="font-bold text-xl">No Products Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
               <div className="mt-12 flex justify-center">
                <Button variant="outline" disabled>Load More</Button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
