'use server';
/**
 * @fileOverview A leaderboard commentary AI agent.
 *
 * - generateLeaderboardCommentary - A function that handles the commentary generation.
 */

import { ai } from '@/ai/genkit';
import { LeaderboardCommentaryInputSchema, LeaderboardCommentaryOutputSchema, type LeaderboardCommentaryInput, type LeaderboardCommentaryOutput } from '@/ai/schemas/leaderboard-commentary';

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
