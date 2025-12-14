import BestSellers from '@/components/home/best-sellers';

export default function ShopPage() {
  return (
    <div className="container py-8">
      <h1 className="font-headline text-3xl font-bold md:text-4xl">Shop All Products</h1>
      <p className="mt-4 text-muted-foreground">Explore our entire collection of comfort.</p>
      <div className="mt-8">
        <BestSellers />
      </div>
    </div>
  );
}
