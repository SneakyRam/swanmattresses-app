
'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const popularSearches = [
  'OrthoDream Support',
  'L-Shape Sofa',
  'Wooden Bed Frame',
  'Queen Size Mattress',
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log('Searching for:', query);
    // Here you would navigate to a search results page, e.g., router.push(`/search?q=${query}`)
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mattresses, beds, sofas..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">Popular Searches</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {popularSearches.map((searchTerm) => (
                    <Button
                        key={searchTerm}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setQuery(searchTerm);
                        }}
                    >
                        {searchTerm}
                    </Button>
                ))}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
