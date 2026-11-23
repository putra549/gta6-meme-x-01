// Entry program for the make.fun bounty "Post a GTA 6 meme on X" (gta6-meme-x-01).
//
// The real entry is the X post itself: a GTA 6 meme with make.fun's ghost in the
// picture, posted publicly with the bounty link, a @makefunai tag and a play code
// in its text. This program's single job is to hand the post's address to the
// gate: it copies POST.json from the repository root into the output directory,
// where the grader reads it. Nothing else is required of it.
//
// Inside the grader the two directories are /bot and /output. When running by
// hand they can be pointed elsewhere through the environment, e.g.:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22+, standard library only. No network, no clock, no randomness:
// two runs of this program always write the same bytes.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The output directory may not exist yet on a fresh grader run.
mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(botDir, 'POST.json'), join(outputDir, 'POST.json'));
} catch (error) {
  console.error(`could not copy POST.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
