import { RsbuildPlugin } from "@rsbuild/core";
import { convertManifest } from "./manifest/convert-manifest";

export const pluginWebExtension = (): RsbuildPlugin => ({
  name: "rsbuild:plugin-web-extension",
  setup: (api) => {
    api.onAfterBuild(() => {
      convertManifest(api);
    });
  },
});
