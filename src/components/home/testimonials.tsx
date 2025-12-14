import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Hyderabad, IN',
    avatarId: 'testimonial-1',
    rating: 5,
    text: "The best mattress I've ever owned! My back pain is gone, and I wake up feeling refreshed every morning. The quality is simply outstanding.",
  },
  {
    name: 'Rohan Kumar',
    location: 'Bengaluru, IN',
    avatarId: 'testimonial-2',
    rating: 5,
    text: "From the in-store experience to the delivery and setup, everything was seamless. The sofa we bought is both beautiful and incredibly comfortable.",
  },
  {
    name: 'Anjali Desai',
    location: 'Mumbai, IN',
    avatarId: 'testimonial-3',
    rating: 5,
    text: "I was hesitant to buy a mattress online, but Swan Mattresses exceeded all my expectations. It's the perfect blend of firm support and soft comfort.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Words From Our Customers
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            See why families across India trust Swan for their homes.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const avatar = PlaceHolderImages.find((img) => img.id === testimonial.avatarId);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                          <div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="mt-4 text-base text-foreground italic">"{testimonial.text}"</p>
                          </div>
                          <div className="mt-6 flex items-center gap-4">
                            {avatar && (
                              <Image
                                src={avatar.imageUrl}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                                data-ai-hint={avatar.imageHint}
                              />
                            )}
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
