'use server';
/**
 * @fileOverview A leaderboard commentary AI agent.
 *
 * - generateLeaderboardCommentary - A function that handles the commentary generation.
 * - LeaderboardCommentaryInput - The input type for the commentary generation.
 * - LeaderboardCommentaryOutput - The return type for the commentary generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TeamSchema = z.object({
  name: z.string(),
  rank: z.number(),
  points: z.number(),
});

export const LeaderboardCommentaryInputSchema = z.object({
  teams: z.array(TeamSchema),
});
export type LeaderboardCommentaryInput = z.infer<typeof LeaderboardCommentaryInputSchema>;

export const LeaderboardCommentaryOutputSchema = z.object({
  commentary: z.string().describe('The generated commentary for the leaderboard.'),
});
export type LeaderboardCommentaryOutput = z.infer<typeof LeaderboardCommentaryOutputSchema>;

export async function generateLeaderboardCommentary(input: LeaderboardCommentaryInput): Promise<LeaderboardCommentaryOutput> {
  return leaderboardCommentaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'leaderboardCommentaryPrompt',
  input: { schema: LeaderboardCommentaryInputSchema },
  output: { schema: LeaderboardCommentaryOutputSchema },
  prompt: `
    You are an expert commentator for a live Capture The Flag (CTF) cybersecurity event called "Zero Day Arena".
    Your role is to provide engaging and insightful commentary on the state of the leaderboard.

    Analyze the provided team data:
    {{#each teams}}
    - Rank {{rank}}: {{name}} ({{points}} points)
    {{/each}}

    Based on this data, generate a short, exciting commentary (2-3 sentences).
    - Highlight the top team and the fierce competition.
    - Mention any notable point gaps or close rivalries.
    - Keep the tone energetic and professional.
    - Do not list the teams again. Provide a narrative.
  `,
});

const leaderboardCommentaryFlow = ai.defineFlow(
  {
    name: 'leaderboardCommentaryFlow',
    inputSchema: LeaderboardCommentaryInputSchema,
    outputSchema: LeaderboardCommentaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
