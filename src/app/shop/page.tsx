'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';
import SortDropdown from '@/components/shop/sort-dropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy data, to be replaced by Firebase
const allProducts = [
  { id: '1', name: 'CloudComfort Premium', price: 25999, oldPrice: 32999, rating: 4.8, reviews: 120, imageId: 'product-1', href: '/product/cloudcomfort-premium', category: 'Mattresses', material: 'Foam', size: 'Queen' },
  { id: '2', name: 'OrthoDream Support', price: 18999, rating: 4.9, reviews: 250, imageId: 'product-2', href: '/product/orthodream-support', category: 'Mattresses', material: 'Latex', size: 'King' },
  { id: '3', name: 'LuxeSleep Gel Memory', price: 29999, oldPrice: 38999, rating: 4.7, reviews: 98, imageId: 'product-3', href: '/product/luxesleep-gel-memory', category: 'Mattresses', material: 'Foam', size: 'Queen' },
  { id: '4', name: 'EcoRest Organic Latex', price: 34999, rating: 4.9, reviews: 75, imageId: 'product-4', href: '/product/ecorest-organic-latex', category: 'Mattresses', material: 'Latex', size: 'Single' },
  { id: '5', name: 'Majestic Wooden Frame', price: 45999, rating: 4.8, reviews: 80, imageId: 'product-1', href: '/product/majestic-wooden-frame', category: 'Beds', material: 'Solid Wood', size: 'King' },
  { id: '6', name: 'Plush Upholstered Bed', price: 52999, oldPrice: 60000, rating: 4.9, reviews: 110, imageId: 'product-2', href: '/product/plush-upholstered-bed', category: 'Beds', material: 'Fabric', size: 'Queen' },
  { id: '7', name: 'Modern L-Shape Sofa', price: 79999, rating: 4.9, reviews: 150, imageId: 'product-3', href: '/product/modern-l-shape-sofa', category: 'Sofas', material: 'Fabric', size: 'L-Shape' },
  { id: '8', name: 'Classic 3-Seater Sofa', price: 65000, oldPrice: 72000, rating: 4.8, reviews: 200, imageId: 'product-4', href: '/product/classic-3-seater-sofa', category: 'Sofas', material: 'Leatherette', size: '3-Seater' },
];

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
        materials: ['Solid Wood', 'Fabric', 'Metal', 'Leatherette', 'Foam', 'Latex'],
        sizes: ['Single', 'Double', 'Queen', 'King', 'L-Shape', '3-Seater', '2-Seater'],
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

    