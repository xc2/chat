import { toWebHandler } from "h3";
import { precacheAndRoute } from "workbox-precaching";
import { app } from "./server.ts";

declare var self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST ?? []);

export const handler = toWebHandler(app);

addEventListener("fetch", (event) => {
  const u = new URL(event.request.url);
  console.log(`Service worker: ${u.pathname}`, event.request.url);
  if (u.pathname.startsWith("/api/")) {
    event.respondWith(handler(event.request));
  }
});
console.log("url", import.meta.url);

addEventListener("install", () => {
  self.skipWaiting();
});

addEventListener("activate", () => {
  return self.clients.claim();
});
