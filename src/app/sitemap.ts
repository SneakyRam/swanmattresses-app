import { MetadataRoute } from 'next';
import { allProducts } from '@/lib/products';
import { WEBSITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', 
    '/about', 
    '/contact', 
    '/shop', 
    '/mattresses', 
    '/beds', 
    '/sofas',
    '/login',
    '/signup',
    '/privacy-policy',
    '/terms'
  ].map((route) => ({
    url: `${WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const productRoutes = allProducts.map((product) => ({
    url: `${WEBSITE_URL}${product.href}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...productRoutes];
}
