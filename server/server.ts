import { createApp, defineEventHandler } from "h3";

export const app = createApp();

app.use(defineEventHandler(() => "Hello world!"));
