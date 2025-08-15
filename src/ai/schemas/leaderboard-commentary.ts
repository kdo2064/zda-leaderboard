/**
 * @fileOverview Defines the Zod schemas and TypeScript types for the leaderboard commentary feature.
 *
 * - LeaderboardCommentaryInputSchema: The Zod schema for the input of the commentary generation.
 * - LeaderboardCommentaryInput: The TypeScript type inferred from the input schema.
 * - LeaderboardCommentaryOutputSchema: The Zod schema for the output of the commentary generation.
 * - LeaderboardCommentaryOutput: The TypeScript type inferred from the output schema.
 */

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
