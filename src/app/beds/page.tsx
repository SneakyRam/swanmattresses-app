
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

const heroImage = PlaceHolderImages.find((img) => img.id === 'category-bed');
const beds = allProducts.filter(p => p.category === 'Beds');


export default function BedsPage() {
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState('popularity');

  const filteredBeds = useMemo(() => {
    return beds.filter(bed => {
      // Category filter is based on material for beds
      if (filters.category?.length > 0 && !filters.category.includes(bed.material)) {
        return false;
      }
      // Price filter
      if (filters.price) {
        if (bed.price < filters.price[0] || bed.price > filters.price[1]) {
          return false;
        }
      }
      // Rating filter
      if (filters.ratings?.length > 0 && !filters.ratings.some((r: number) => bed.rating >= r)) {
        return false;
      }
       // Size filter
      if (filters.size?.length > 0 && !filters.size.includes(bed.size)) {
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
    // Here you would typically refetch data
  };

  const FilterSidebar = () => (
    <ProductFilters
        filters={{
          categories: ['Solid Wood', 'Fabric', 'Metal'],
          priceRange: { min: 15000, max: 80000 },
          ratings: [5, 4, 3],
          materials: [], // Using categories for materials
          sizes: ['Single', 'Double', 'Queen', 'King'],
        }}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex h-[60vh] min-h-[400px] items-center justify-center overflow-hidden text-primary-foreground">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          className="relative z-10 p-4 text-center"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Elegance & Durability
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
            }}
            className="mt-4 max-w-xl text-lg text-slate-200"
          >
            Discover bed frames that define your space with style that lasts.
          </motion.p>
        </motion.div>
      </section>

      {/* Main content */}
      <main className="container py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Our Beds</h1>
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
             {filteredBeds.length > 0 ? (
                <ProductGrid products={filteredBeds} />
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
