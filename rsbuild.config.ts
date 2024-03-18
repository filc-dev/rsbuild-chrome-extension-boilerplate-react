import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginWebExtension } from "./plugins/rsbuild-plugin-web-extension";

export default defineConfig({
  plugins: [pluginReact(), pluginWebExtension()],

  tools: {
    htmlPlugin: [
      {
        chunks: ["popup"],
        filename: "./src/popup/index.html",
        template: "./src/popup/index.html",
        minify: true,
      },
    ],
  },
  source: {
    entry: {
      popup: "./src/popup/index.tsx",
      background: "./src/background/index.ts",
    },
  },
  output: {
    filename: {
      js: "[name].js",
    },
    distPath: {
      js: "src/[name]",
    },
  },
});
