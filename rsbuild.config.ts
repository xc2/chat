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
            name: "web",
            dependencies: ["server"],
            plugins: [
              new InjectManifest({
                swSrc: "./dist/server-template.js",
                compileSrc: false,

                swDest: "server.js",
              }),
            ],
          },
        ],
      },
    },
    server: {
      plugins: [],
      source: {
        entry: {
          server: { import: "./server/index.ts", filename: "server-template.js" },
        },
        tsconfigPath: "./server/tsconfig.json",
        assetsInclude: [/\.sql$/],
      },
      dev: {
        writeToDisk: true,
      },
      output: {
        target: "web-worker",
        distPath: {},
      },
      tools: {
        rspack: {
          name: "server",
        },
      },
    },
  },
});
