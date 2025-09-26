import { Leaf, Truck, Smile } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Always Fresh',
    description: 'We source directly from local farms to ensure you get the freshest produce every time.',
    imageId: 'feature-1',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Convenient Delivery',
    description: 'Your custom box is delivered to your doorstep daily, saving you time and effort.',
    imageId: 'feature-2',
  },
  {
    icon: <Smile className="h-8 w-8 text-primary" />,
    title: 'Healthy & Happy',
    description: 'Enjoy a variety of fruits and vegetables that make healthy eating easy and enjoyable for the whole family.',
    imageId: 'feature-3',
  },
];

export default function Features() {
  const images = PlaceHolderImages;

  return (
    <section id="features" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Why Choose Us?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the difference with Fresh Harvest.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const featureImage = images.find((img) => img.id === feature.imageId);
            return (
              <Card key={index} className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                {featureImage && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={featureImage.imageUrl}
                            alt={featureImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={featureImage.imageHint}
                        />
                    </div>
                )}
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
