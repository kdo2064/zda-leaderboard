import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitx} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
    genkitx(),
  ],
  model: 'googleai/gemini-1.5-flash',
  enableTracing: true,
  logLevel: 'debug',
});
