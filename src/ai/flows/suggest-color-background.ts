// src/ai/flows/suggest-color-background.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests suitable color backgrounds based on the product in the foreground.
 *
 * - suggestColorBackground - A function that suggests a color background for a product image.
 * - SuggestColorBackgroundInput - The input type for the suggestColorBackground function.
 * - SuggestColorBackgroundOutput - The return type for the suggestColorBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestColorBackgroundInputSchema = z.object({
  productPhotoDataUri: z
    .string()
    .describe(
      "A photo of the product with background removed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type SuggestColorBackgroundInput = z.infer<typeof SuggestColorBackgroundInputSchema>;

const SuggestColorBackgroundOutputSchema = z.object({
  suggestedColor: z
    .string()
    .describe(
      'A suggested background color in hex format (e.g., #RRGGBB) that complements the product in the image.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind choosing the suggested background color, referring characteristics of the product.'
    ),
});

export type SuggestColorBackgroundOutput = z.infer<typeof SuggestColorBackgroundOutputSchema>;

export async function suggestColorBackground(
  input: SuggestColorBackgroundInput
): Promise<SuggestColorBackgroundOutput> {
  return suggestColorBackgroundFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestColorBackgroundPrompt',
  input: {schema: SuggestColorBackgroundInputSchema},
  output: {schema: SuggestColorBackgroundOutputSchema},
  prompt: `You are a professional color consultant for e-commerce product images.

  Given a product image, your task is to suggest a background color that best complements the product to make it visually appealing for online sales. Provide the color in hex format #RRGGBB.
  Also, explain your reasoning for choosing that color, referencing specific characteristics of the product, like color, style, or intended use.

  Product Image: {{media url=productPhotoDataUri}}

  Respond in JSON format.
  `,
});

const suggestColorBackgroundFlow = ai.defineFlow(
  {
    name: 'suggestColorBackgroundFlow',
    inputSchema: SuggestColorBackgroundInputSchema,
    outputSchema: SuggestColorBackgroundOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
