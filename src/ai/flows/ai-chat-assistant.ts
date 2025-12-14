'use server';

/**
 * @fileOverview Implements the Swan AI chat assistant flow with predefined smart replies for customer support.
 *
 * - aiChatAssistant - A function that returns predefined smart replies for social media and contact options.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function (currently empty).
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function, containing smart replies.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { BRAND_NAME, CONTACT_PHONE, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, WHATSAPP_LINK } from '@/lib/constants';

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

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI chat assistant for ${BRAND_NAME}. Your name is Swan AI.

Provide a set of smart replies to help users quickly connect with the brand. The replies should include:
- A link to chat on WhatsApp. The URL is ${WHATSAPP_LINK}.
- A link to the Instagram page. The URL is ${SOCIAL_INSTAGRAM}.
- A link to call the store. The phone number is ${CONTACT_PHONE}.
- A link to the Facebook page. The URL is ${SOCIAL_FACEBOOK}.

Ensure the output is a valid JSON object with a "smartReplies" array. Each object in the array must have a "label" (e.g., "Chat on WhatsApp") and a "url" (e.g., "tel:${CONTACT_PHONE}" for the phone call).
`
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
