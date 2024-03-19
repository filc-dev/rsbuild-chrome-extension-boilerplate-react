import { RsbuildPluginAPI } from "@rsbuild/core";
import { existsSync } from "fs";
import { resolve } from "path";

export const getManifest = async (
  api: RsbuildPluginAPI
): Promise<{
  default: chrome.runtime.ManifestV3;
}> => {
  const allowManifestExtensions = ["ts", "js", "json"];

  const mainifestExtension = allowManifestExtensions.find((ext) => {
    return existsSync(resolve(api.context.rootPath, `manifest.${ext}`));
  });

  if (!mainifestExtension) {
    throw new Error("Can't find manifest file.");
  }

  const manifestPath = resolve(
    api.context.rootPath,
    `manifest.${mainifestExtension}`
  );

  return await import(manifestPath);
};
