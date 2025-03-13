import { toWebHandler } from "h3";
import { precacheAndRoute } from "workbox-precaching";
import { app } from "./server.ts";

declare var self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST ?? []);

export const handler = toWebHandler(app);

addEventListener("fetch", (event) => {
  const u = new URL(event.request.url);
  console.log(11, u);
  if (u.pathname.startsWith("/api/")) {
    event.respondWith(handler(event.request));
  }
});

addEventListener("install", () => {
  self.skipWaiting();
});

addEventListener("activate", (event) => {
  console.log("activate");
  event.waitUntil(
    self.clients
      .matchAll({
        includeUncontrolled: true,
        type: "window",
      })
      .then((clients) => {
        for (const client of clients ?? []) {
          client.postMessage({ type: "UPDATE_READY" });
        }
      })
  );

  return self.clients.claim();
});
