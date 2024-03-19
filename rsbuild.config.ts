import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginWebExtension } from "./plugins/rsbuild-plugin-web-extension";

export default defineConfig({
  plugins: [pluginReact(), pluginWebExtension()],

  output: {
    filename: {
      js: "[name].js",
    },
    distPath: {
      js: "src/[name]",
    },
  },
});
