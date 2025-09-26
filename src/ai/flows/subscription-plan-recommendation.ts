'use server';

/**
 * @fileOverview Recommends a subscription plan based on user profile and sales metrics.
 *
 * - recommendSubscriptionPlan - A function that recommends a subscription plan.
 * - SubscriptionPlanRecommendationInput - The input type for the recommendSubscriptionPlan function.
 * - SubscriptionPlanRecommendationOutput - The return type for the recommendSubscriptionPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubscriptionPlanRecommendationInputSchema = z.object({
  userProfile: z
    .object({
      purchaseHistory: z.array(z.string()).describe('List of past purchases'),
      dietaryPreferences: z.string().describe('Dietary restrictions or preferences'),
      householdSize: z.number().describe('Number of people in the household'),
    })
    .describe('The user profile information.'),
  recentSalesMetrics: z
    .object({
      mostPopularItem: z.string().describe('The most popular item recently sold'),
      averageOrderSize: z.number().describe('The average number of items per order'),
    })
    .describe('Recent sales metrics data.'),
});
export type SubscriptionPlanRecommendationInput = z.infer<
  typeof SubscriptionPlanRecommendationInputSchema
>;

const SubscriptionPlanRecommendationOutputSchema = z.object({
  recommendedPlan: z
    .object({
      itemsPerDay: z.number().describe('Recommended number of items per day'),
      price: z.number().describe('Price of the recommended plan'),
      planDescription: z.string().describe('A description of the recommended plan'),
    })
    .describe('The recommended subscription plan.'),
});
export type SubscriptionPlanRecommendationOutput = z.infer<
  typeof SubscriptionPlanRecommendationOutputSchema
>;

export async function recommendSubscriptionPlan(
  input: SubscriptionPlanRecommendationInput
): Promise<SubscriptionPlanRecommendationOutput> {
  return recommendSubscriptionPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'subscriptionPlanRecommendationPrompt',
  input: {schema: SubscriptionPlanRecommendationInputSchema},
  output: {schema: SubscriptionPlanRecommendationOutputSchema},
  prompt: `You are an AI assistant specializing in recommending subscription plans for a fruit and vegetable delivery service.

  Based on the user's profile and recent sales metrics, recommend a subscription plan that best suits their needs.

  User Profile:
  - Purchase History: {{userProfile.purchaseHistory}}
  - Dietary Preferences: {{userProfile.dietaryPreferences}}
  - Household Size: {{userProfile.householdSize}}

  Recent Sales Metrics:
  - Most Popular Item: {{recentSalesMetrics.mostPopularItem}}
  - Average Order Size: {{recentSalesMetrics.averageOrderSize}}

  Consider these factors when recommending a plan:
  - User's purchase history and dietary preferences.
  - Household size to determine the appropriate number of items per day.
  - Popular items and average order size to suggest relevant items.

  The recommended plan should include:
  - itemsPerDay: The recommended number of items per day.
  - price: The price of the recommended plan.
  - planDescription: A brief description of the plan.

  Provide the recommendation in JSON format.
  `,
});

const recommendSubscriptionPlanFlow = ai.defineFlow(
  {
    name: 'recommendSubscriptionPlanFlow',
    inputSchema: SubscriptionPlanRecommendationInputSchema,
    outputSchema: SubscriptionPlanRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
