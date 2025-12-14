'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Star, X } from 'lucide-react';
import { Label } from '../ui/label';

interface Filters {
  categories?: string[];
  priceRange: { min: number; max: number };
  ratings?: number[];
  materials?: string[];
  sizes?: string[];
}

interface ProductFiltersProps {
  filters: Filters;
  currentFilters: any;
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ filters, currentFilters, onFilterChange }: ProductFiltersProps) {
  const [price, setPrice] = useState([currentFilters.price?.[0] || filters.priceRange.min, currentFilters.price?.[1] || filters.priceRange.max]);

  const handleCheckboxChange = (group: string, value: string) => {
    const newFilters = { ...currentFilters };
    if (!newFilters[group]) {
      newFilters[group] = [];
    }
    const index = newFilters[group].indexOf(value);
    if (index === -1) {
      newFilters[group].push(value);
    } else {
      newFilters[group].splice(index, 1);
    }
    onFilterChange(newFilters);
  };
  
  const handleRatingChange = (rating: number) => {
    const newFilters = { ...currentFilters };
     if (!newFilters['ratings']) {
      newFilters['ratings'] = [];
    }
    const index = newFilters['ratings'].indexOf(rating);
    if (index === -1) {
      newFilters['ratings'].push(rating);
    } else {
      newFilters['ratings'].splice(index, 1);
    }
    onFilterChange(newFilters);
  };

  const handlePriceCommit = (value: number[]) => {
    onFilterChange({ ...currentFilters, price: value });
  };
  
  const clearFilters = () => {
    setPrice([filters.priceRange.min, filters.priceRange.max]);
    onFilterChange({});
  }

  const formatPrice = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);

  const filterSections = [
    {
      id: 'category',
      name: 'Category',
      options: filters.categories,
      type: 'checkbox'
    },
    {
      id: 'price',
      name: 'Price Range',
      type: 'slider'
    },
    {
      id: 'ratings',
      name: 'Rating',
      options: filters.ratings,
      type: 'rating'
    },
    {
      id: 'size',
      name: 'Size',
      options: filters.sizes,
      type: 'checkbox'
    },
    {
      id: 'material',
      name: 'Material',
      options: filters.materials,
      type: 'checkbox'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
          <X className="mr-2 h-4 w-4" />
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['category', 'price', 'ratings', 'size', 'material']} className="w-full">
        {filterSections.map((section) => {
          if (!section.options && section.type !== 'slider') return null;
          if (section.options && section.options.length === 0) return null;

          return (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-base font-medium">{section.name}</AccordionTrigger>
              <AccordionContent>
                {section.type === 'slider' && (
                  <div className="px-1">
                    <Slider
                      min={filters.priceRange.min}
                      max={filters.priceRange.max}
                      step={100}
                      value={price}
                      onValueChange={setPrice}
                      onValueCommit={handlePriceCommit}
                    />
                    <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(price[0])}</span>
                      <span>{formatPrice(price[1])}</span>
                    </div>
                  </div>
                )}
                {section.type === 'checkbox' && (
                  <div className="space-y-3">
                    {section.options?.map((option: any) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${section.id}-${option}`}
                          checked={currentFilters[section.id]?.includes(option)}
                          onCheckedChange={() => handleCheckboxChange(section.id, option)}
                        />
                        <Label htmlFor={`${section.id}-${option}`} className="font-normal capitalize">
                          {option.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {section.type === 'rating' && (
                  <div className="space-y-3">
                     {section.options?.sort((a, b) => b - a).map((rating: any) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                            id={`rating-${rating}`}
                            checked={currentFilters.ratings?.includes(rating)}
                            onCheckedChange={() => handleRatingChange(rating)}
                        />
                         <Label htmlFor={`rating-${rating}`} className="flex items-center font-normal">
                           {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`}
                              />
                            ))}
                            <span className="ml-2 text-muted-foreground">& up</span>
                         </Label>
                       </div>
                     ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
