import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextPlugin} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    nextPlugin(),
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  model: 'googleAI/gemini-pro',
  enableTracing: true,
  logLevel: 'debug',
});
