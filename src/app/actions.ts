'use server';

import { recommendSubscriptionPlan } from '@/ai/flows/subscription-plan-recommendation';
import { z } from 'zod';

const FormSchema = z.object({
  purchaseHistory: z.array(z.string()),
  dietaryPreferences: z.string().min(1, 'Please select a dietary preference.'),
  householdSize: z.coerce.number().min(1, 'Household size must be at least 1.'),
});

export type RecommendationState = {
  message?: string | null;
  recommendation?: {
    itemsPerDay: number;
    price: number;
    planDescription: string;
  } | null;
  errors?: {
    purchaseHistory?: string[];
    dietaryPreferences?: string[];
    householdSize?: string[];
  };
};

export async function getPlanRecommendation(prevState: RecommendationState, formData: FormData): Promise<RecommendationState> {
  const purchaseHistory = formData.getAll('purchaseHistory') as string[];
  const validatedFields = FormSchema.safeParse({
    purchaseHistory: purchaseHistory,
    dietaryPreferences: formData.get('dietaryPreferences'),
    householdSize: formData.get('householdSize'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Get Recommendation.',
    };
  }

  const { dietaryPreferences, householdSize } = validatedFields.data;

  try {
    // Mock recent sales metrics as they are not user-provided
    const recentSalesMetrics = {
      mostPopularItem: 'Organic Apples',
      averageOrderSize: 5,
    };

    const result = await recommendSubscriptionPlan({
      userProfile: {
        purchaseHistory,
        dietaryPreferences,
        householdSize,
      },
      recentSalesMetrics,
    });
    
    return {
      message: 'Successfully generated recommendation.',
      recommendation: result.recommendedPlan,
    };
  } catch (error) {
    return {
      message: 'An error occurred while getting your recommendation. Please try again.',
    };
  }
}
