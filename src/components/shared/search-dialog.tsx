
'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { allProducts, type Product } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    if (query.trim().length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  // Navigate to a dedicated search results page on form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // For now, we just close the dialog and rely on live results.
    // A full search page could be implemented here.
    setOpen(false);
    // router.push(`/search?q=${query}`);
  };
  
  const handleResultClick = () => {
    setOpen(false);
    setQuery('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mattresses, beds, sofas..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setQuery('')}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
          <Button type="submit" disabled={!query.trim()}>Search</Button>
        </form>
        
        <div className="mt-4">
            {query.length > 1 ? (
                <ScrollArea className="h-[400px]">
                    {searchResults.length > 0 ? (
                         <div className="space-y-4">
                            <p className="text-sm font-medium text-muted-foreground">{searchResults.length} results found</p>
                            {searchResults.map((product) => {
                                const image = PlaceHolderImages.find((img) => img.id === product.imageId);
                                return (
                                    <Link 
                                        href={product.href} 
                                        key={product.id}
                                        onClick={handleResultClick}
                                        className="flex items-center gap-4 p-2 -mx-2 rounded-lg transition-colors hover:bg-accent"
                                    >
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                             {image && (
                                                <Image 
                                                    src={image.imageUrl} 
                                                    alt={product.name} 
                                                    fill
                                                    className="object-cover" 
                                                />
                                             )}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-sm text-primary">{formatPrice(product.price)}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                         </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="font-semibold">No results found for "{query}"</p>
                            <p className="text-sm text-muted-foreground mt-2">Try a different search term.</p>
                        </div>
                    )}
                </ScrollArea>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">Search for products by name, category, or description.</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
