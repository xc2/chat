import { writeFileSync } from "node:fs";
import * as NodePath from "node:path";
import { inspect } from "node:util";
import { readMigrationFiles } from "drizzle-orm/migrator";
import config from "../drizzle.config";

function resolvePath(...targets: string[]) {
  return NodePath.resolve(import.meta.dirname, "..", config.out ?? "drizzle", ...targets);
}

const r = readMigrationFiles({
  migrationsFolder: resolvePath(),
});
const ts =
  `
/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// biome-ignore format: generated
export const migrations: MigrationMeta[] = ${inspect(r, { compact: false, depth: Infinity })};
`.trim() + "\n";

writeFileSync(resolvePath("migrations.ts"), ts, "utf8");
