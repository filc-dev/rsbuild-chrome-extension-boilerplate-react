import { RsbuildPlugin } from "@rsbuild/core";
import { makeManifest } from "./manifest/make-manifest";
import { getManifest } from "./manifest/get-manifest";

export const pluginWebExtension = (): RsbuildPlugin => ({
  name: "rsbuild:plugin-web-extension",
  setup: async (api) => {
    const { default: manifest } = await getManifest(api);

    api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
      return mergeRsbuildConfig(config, {
        tools: {
          htmlPlugin: false,
        },
        source: {
          entry: {
            background: manifest.background?.service_worker || "",
          },
        },
      });
    });

    api.onAfterBuild(() => {
      makeManifest(manifest, api.context.distPath);
    });
  },
});
