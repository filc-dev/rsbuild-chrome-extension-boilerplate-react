import * as fs from "fs";
import { resolve } from "path";
import ManifestParser from "./parser";
import { RsbuildPluginAPI } from "@rsbuild/core";

const getManifest = async (
  api: RsbuildPluginAPI
): Promise<{
  default: chrome.runtime.ManifestV3;
}> => {
  const manifestPath = resolve(api.context.rootPath, "manifest.ts");

  return await import(manifestPath);
};

export const convertManifest = async (api: RsbuildPluginAPI) => {
  const distPath = api.context.distPath;

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  const toManifest = resolve(distPath, "manifest.json");

  const manifest = await getManifest(api);

  fs.writeFileSync(
    toManifest,
    ManifestParser.convertManifestToString(manifest.default)
  );
};