
'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';
import SortDropdown from '@/components/shop/sort-dropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { allProducts } from '@/lib/products';

export default function ShopPage() {
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState('popularity');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter
      if (filters.category?.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      // Price filter
      if (filters.price) {
        if (product.price < filters.price[0] || product.price > filters.price[1]) {
          return false;
        }
      }
      // Rating filter
      if (filters.ratings?.length > 0 && !filters.ratings.some((r: number) => product.rating >= r)) {
        return false;
      }
      // Material filter
      if (filters.material?.length > 0 && !filters.material.includes(product.material)) {
        return false;
      }
      // Size filter
      if (filters.size?.length > 0 && !filters.size.includes(product.size)) {
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
    // In a real app, you would sort the products here
  };
  
  const FilterSidebar = () => (
    <ProductFilters
      filters={{
        categories: ['Mattresses', 'Beds', 'Sofas'],
        priceRange: { min: 10000, max: 100000 },
        ratings: [5, 4, 3],
        materials: ['Solid Wood', 'Fabric', 'Metal', 'Leatherette', 'Foam', 'Latex', 'Spring', 'Hybrid', 'Velvet'],
        sizes: ['Single', 'Double', 'Queen', 'King', 'L-Shape', '3-Seater', '2-Seater', 'Sofa Bed'],
      }}
      currentFilters={filters}
      onFilterChange={handleFilterChange}
    />
  );

  return (
    <div>
      <section className="bg-secondary py-12">
        <div className="container text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-headline text-4xl font-bold md:text-5xl"
            >
                Explore Our Collection
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
                Find the perfect centerpiece for your home, from the bedroom to the living room.
            </motion.p>
        </div>
      </section>

      <main className="container py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
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
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              All Products
            </h1>
          </div>
          <SortDropdown value={sort} onValueChange={handleSortChange} />
        </div>

        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-4 lg:grid-cols-5">
          <aside className="hidden md:block md:col-span-1 lg:col-span-1">
            <FilterSidebar />
          </aside>
          <div className="md:col-span-3 lg:col-span-4">
            {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <h3 className="font-bold text-xl">No Products Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
             <div className="mt-12 flex justify-center">
              {/* Pagination would go here */}
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
