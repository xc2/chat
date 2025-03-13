import { InjectManifest } from "@aaroon/workbox-rspack-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  environments: {
    web: {
      plugins: [pluginReact()],
      html: {
        template: "./web/index.html",
      },
      source: {
        entry: {
          index: "./web/index.tsx",
        },
        tsconfigPath: "./web/tsconfig.json",
      },
      output: {
        target: "web",
      },
      tools: {
        rspack: [
          {
            plugins: [
              new InjectManifest({
                swSrc: "./server/index.ts",
                swDest: "server.js",
              }),
            ],
          },
        ],
      },
    },
  },
});
