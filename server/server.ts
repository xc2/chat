import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { createApp, createRouter, defineEventHandler, useBase } from "h3";
import { example } from "./db/schema.ts";
import "./db/migrate.ts";

const client = new PGlite("memory://");
const db = drizzle({ client });

export const app = createApp({});

const router = createRouter({});

router.post(
  "/foo",
  defineEventHandler(async () => {
    console.log("Helloworld!");
    const item: typeof example.$inferInsert = {
      foo: "bar",
      bar: 1,
    };
    await db.insert(example).values(item);
    console.log("inserted");
    return "Hello world!";
  })
);

app.use(createRouter().use("/api/**", useBase("/api", router.handler)));
