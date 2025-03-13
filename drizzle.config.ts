import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  driver: "pglite",
  schema: "./server/db/schema.ts",
  out: "./server/drizzle",
});
