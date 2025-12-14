
import { notFound } from 'next/navigation';
import { ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import BestSellers from '@/components/home/best-sellers';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PurchaseInquiryDialog } from '@/components/shop/purchase-inquiry-dialog';
import { allProducts } from '@/lib/products';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = allProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <div className="bg-background">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:origin-bottom-left hover:after:scale-x-100">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:origin-bottom-left hover:after:scale-x-100">
            Shop
          </Link>
           <ChevronRight className="h-4 w-4" />
          <Link href={`/${product.category.toLowerCase()}`} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:origin-bottom-left hover:after:scale-x-100">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-0">
              <div className="relative aspect-square w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                {product.oldPrice && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    SALE
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <PurchaseInquiryDialog productName={product.name} />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <BestSellers title="You Might Also Like" currentProductId={product.id} />
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
