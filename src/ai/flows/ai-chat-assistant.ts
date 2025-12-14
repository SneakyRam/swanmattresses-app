'use server';

/**
 * @fileOverview Implements the AI chat assistant flow with predefined smart replies and links to social media.
 *
 * - aiChatAssistant - A function that returns predefined smart replies and social media links.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function (currently empty).
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function, containing smart replies and social media links.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  smartReplies: z.array(z.object({
    label: z.string().describe('The display text for the smart reply.'),
    url: z.string().url().describe('The URL to navigate to when the smart reply is clicked.'),
  })).describe('An array of smart replies with labels and URLs.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const aiChatAssistantPrompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI chat assistant for Swan Mattresses. Provide a set of smart replies that can help users quickly find information or connect with the brand on social media.

  The smart replies should include options to:
  - Talk on WhatsApp
  - Visit Instagram
  - Call Store
  - Visit Facebook

  The URLs should point to the correct resources.

  Format the output as a JSON object with a \"smartReplies\" array. Each smart reply should have a \"label\" and a \"url\" field.
`
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiChatAssistantPrompt(input);
    return output!;
  }
);
