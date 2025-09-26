'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useState, useActionState } from 'react';
import { ArrowRight, Loader2, Wand2 } from 'lucide-react';

import { getPlanRecommendation, type RecommendationState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const initialState: RecommendationState = { message: null, errors: {} };

const purchaseHistoryOptions = ['Fruits', 'Vegetables', 'Organic', 'Juices', 'Snacks'];
const dietaryPreferencesOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Get My Plan <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function PlanRecommender() {
  const [state, dispatch] = useActionState(getPlanRecommendation, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (state.recommendation) {
      setIsDialogOpen(true);
    }
  }, [state.recommendation]);

  return (
    <section id="recommender" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Not Sure Where to Start?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Let our AI assistant recommend the perfect plan based on your needs.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form action={dispatch}>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Wand2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-2xl">Personalized Plan Recommender</CardTitle>
                    <CardDescription>Tell us a bit about your preferences.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>What do you usually buy?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {purchaseHistoryOptions.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox id={item} name="purchaseHistory" value={item} />
                        <Label htmlFor={item} className="font-normal">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dietaryPreferences">Any dietary preferences?</Label>
                    <Select name="dietaryPreferences">
                      <SelectTrigger id="dietaryPreferences">
                        <SelectValue placeholder="Select a preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {dietaryPreferencesOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state.errors?.dietaryPreferences && <p className="text-sm font-medium text-destructive">{state.errors.dietaryPreferences[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="householdSize">Household size</Label>
                    <Input id="householdSize" name="householdSize" type="number" min="1" defaultValue="1" />
                    {state.errors?.householdSize && <p className="text-sm font-medium text-destructive">{state.errors.householdSize[0]}</p>}
                  </div>
                </div>

                {state.message && !state.recommendation && (
                  <p className="text-sm font-medium text-destructive">{state.message}</p>
                )}
              </CardContent>
              <CardFooter className="bg-muted/50 p-6">
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Your Personalized Recommendation</DialogTitle>
            <DialogDescription>
              Based on your preferences, here is the plan we think you'll love!
            </DialogDescription>
          </DialogHeader>
          {state.recommendation && (
            <div className="mt-4 space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <p className="text-sm text-primary font-semibold">Recommended Items Per Day</p>
                <p className="font-bold text-5xl text-primary">{state.recommendation.itemsPerDay}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Plan Details:</p>
                <p className="text-muted-foreground">{state.recommendation.planDescription}</p>
              </div>
              <div className="text-center pt-4">
                <p className="text-muted-foreground">Estimated Monthly Price</p>
                <p className="font-headline text-4xl font-bold">${state.recommendation.price.toFixed(2)}</p>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href="/signup">Sign Up for This Plan</Link>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
