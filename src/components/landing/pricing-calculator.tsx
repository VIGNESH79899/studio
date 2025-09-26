'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { BaggageClaim } from 'lucide-react';
import Link from 'next/link';

const PRICE_PER_ITEM = 2.5;
const DAYS_IN_MONTH = 30;

export default function PricingCalculator() {
  const [itemsPerDay, setItemsPerDay] = useState(5);

  const monthlyPrice = itemsPerDay * PRICE_PER_ITEM * DAYS_IN_MONTH;

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Flexible Plans for Everyone</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Adjust the slider to find the perfect plan for your household. No commitments, cancel anytime.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BaggageClaim className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">Your Custom Box</CardTitle>
              <CardDescription>Select how many items you want per day.</CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Items per day:</span>
                <span className="font-bold text-2xl text-primary">{itemsPerDay}</span>
              </div>
              <Slider
                value={[itemsPerDay]}
                onValueChange={(value) => setItemsPerDay(value[0])}
                min={1}
                max={10}
                step={1}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 bg-muted/50 p-6">
              <div className="text-center">
                <p className="text-muted-foreground">Monthly Price</p>
                <p className="font-headline text-4xl font-bold">
                  ${monthlyPrice.toFixed(2)}
                </p>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
