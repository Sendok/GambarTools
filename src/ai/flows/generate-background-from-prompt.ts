'use server';
/**
 * @fileOverview AI flow to generate a custom background for a product image based on a text prompt.
 *
 * - generateBackgroundFromPrompt - A function that generates a background based on the user's prompt.
 * - GenerateBackgroundFromPromptInput - The input type for the generateBackgroundFromPrompt function.
 * - GenerateBackgroundFromPromptOutput - The return type for the generateBackgroundFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBackgroundFromPromptInputSchema = z.object({
  backgroundPrompt: z.string().describe('A text prompt describing the desired background.'),
});
export type GenerateBackgroundFromPromptInput = z.infer<typeof GenerateBackgroundFromPromptInputSchema>;

const GenerateBackgroundFromPromptOutputSchema = z.object({
  generatedBackground: z.string().describe('The generated background image as a data URI.'),
});
export type GenerateBackgroundFromPromptOutput = z.infer<typeof GenerateBackgroundFromPromptOutputSchema>;

export async function generateBackgroundFromPrompt(
  input: GenerateBackgroundFromPromptInput
): Promise<GenerateBackgroundFromPromptOutput> {
  return generateBackgroundFromPromptFlow(input);
}

const generateBackgroundPrompt = ai.definePrompt({
  name: 'generateBackgroundPrompt',
  input: {schema: GenerateBackgroundFromPromptInputSchema},
  output: {schema: GenerateBackgroundFromPromptOutputSchema},
  prompt: `Generate a background image based on the following description: {{{backgroundPrompt}}}. The generated image should be a data URI.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateBackgroundFromPromptFlow = ai.defineFlow(
  {
    name: 'generateBackgroundFromPromptFlow',
    inputSchema: GenerateBackgroundFromPromptInputSchema,
    outputSchema: GenerateBackgroundFromPromptOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',

      prompt: input.backgroundPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    return {generatedBackground: media!.url!};
  }
);
