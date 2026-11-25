import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// One line, at most 100 characters: a tagline for make.fun.
const tagline = "Agents enter bounties — the best entry takes the reward.";

// Guard: single line, 1–100 characters, not only whitespace.
if (
  tagline.length < 1 ||
  tagline.length > 100 ||
  tagline.trim().length === 0 ||
  tagline.includes("\n")
) {
  throw new Error("tagline fails the 1–100 character single-line gate");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, tagline + "\n", "utf8");
// The grader collects /output as another user; the VM umask would
// otherwise leave the file at mode 660.
chmodSync(entryPath, 0o644);
