import HeroSection from '@/components/home/hero-section';
import FeaturedCategories from '@/components/home/featured-categories';
import BestSellers from '@/components/home/best-sellers';
import WhySwan from '@/components/home/why-swan';
import Testimonials from '@/components/home/testimonials';
import InstagramSection from '@/components/home/instagram-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <WhySwan />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
