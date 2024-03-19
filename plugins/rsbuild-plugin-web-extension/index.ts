import { RsbuildPlugin } from "@rsbuild/core";
import { makeManifest } from "./manifest/make-manifest";
import { getManifest } from "./manifest/get-manifest";

export const pluginWebExtension = (): RsbuildPlugin => ({
  name: "rsbuild:plugin-web-extension",
  setup: async (api) => {
    const { default: manifest } = await getManifest(api);

    const htmlEntryPoints = Object.entries({
      popup: manifest.action?.default_popup,
      devtools: manifest.devtools_page,
      newtab: manifest.chrome_url_overrides?.newtab,
      options: manifest.options_ui?.page,
    }).filter(([, value]) => value);

    /**
     * @todo refactor with html-bundler-webpack-plugin
     * @issue https://github.com/web-infra-dev/rspack/issues/5971
     */
    const entry = htmlEntryPoints.reduce(
      (acc, [name, entry]) => ({
        ...acc,
        [name]: entry?.replace(/\.html$/, ".tsx"),
      }),
      {}
    );

    api.modifyRspackConfig((config, { mergeConfig, HtmlPlugin }) => {
      return mergeConfig(config, {
        plugins: htmlEntryPoints.map(([name, template]) => {
          return new HtmlPlugin({
            chunks: [name],
            template: template,
            filename: template,
          });
        }),
      });
    });

    api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
      return mergeRsbuildConfig(config, {
        tools: {
          htmlPlugin: false,
        },
        source: {
          entry: {
            ...entry,
            background: manifest.background?.service_worker || "",
          },
        },
        output: {
          filenameHash: false,
          distPath: {
            js: "src/[name]",
          },
        },
      });
    });

    api.onAfterBuild(() => {
      makeManifest(manifest, api.context.distPath);
    });
  },
});
